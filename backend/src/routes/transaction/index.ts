import { NextFunction, Request, Router, Response } from "express";
import asyncHandler from "../../helpers/asyncHandler";
import { schemaValidator } from "../../helpers/validator";
import claimSchema, {
  cleanProgressSchema,
  closeProgressSchema,
} from "./schema";
import prisma from "../../database";
import { BadRequestError, NotFoundError } from "../../core/ApiError";
import { Reward } from "@prisma/client";
import upload from "../../helpers/multer";

const router = Router();

const claimUrl = "/api/claims";
const progressUrl = "/api/process";

type CleaningProgressType = {
  evidence: string;
  report_id: string;
  staff_id: string;
};

router.post(
  claimUrl,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, reward_id, claim_qty } = await schemaValidator(
      claimSchema,
      req.body
    );

    // Check if user available
    const user = await prisma.user.findUnique({
      where: {
        user_id,
      },

      select: { user_id: true, name: true, point: true },
    });

    if (!user) {
      throw new NotFoundError("user is not found");
    }

    const reward = await prisma.reward.findUnique({
      where: {
        reward_id,
      },
      select: { reward_name: true, reward_price: true, reward_stock: true },
    });

    if (!reward) {
      throw new NotFoundError("reward is not found");
    }

    // Check stock and user points

    if (!(user.point >= reward.reward_price)) {
      throw new BadRequestError("Insufficient points to claim reward");
    }

    if (!(reward.reward_stock > 0)) {
      throw new BadRequestError("Insufficient stock to fulfill claim");
    }

    const createdTrx = await prisma.claimReward.create({
      data: {
        claim_id: "C".concat(Date.now().toString()),
        claim_qty,
        reward_id,
        user_id,
      },
    });

    // Decrese stock and user points
    await prisma.$transaction(async (prisma) => {
      // 1. Update user points
      await prisma.user.update({
        where: {
          user_id: createdTrx.user_id,
        },
        data: {
          point: {
            decrement: 1,
          },
        },
      });

      // 2.stock
      await prisma.reward.update({
        where: {
          reward_id: createdTrx.reward_id,
        },
        data: {
          reward_stock: {
            decrement: claim_qty, // Adjust the points
          },
        },
      });
    });

    // Send a success response
    res.status(201).json({
      success: true,
      data: {
        claim_id: createdTrx.claim_id,
      },
    });
  })
);

router.get(
  claimUrl,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const claimTrx = await prisma.claimReward.findMany({
      select: {
        claim_id: true,
        User: {
          select: {
            user_id: true,
            name: true,
          },
        },
        reward: {
          select: {
            reward_id: true,
            reward_name: true,
          },
        },
        claim_qty: true,
        created_at: true,
      },
    });

    res.status(200).json({
      success: true,
      data: claimTrx,
    });
  })
);

router.post(
  progressUrl,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const progressValidData: CleaningProgressType = await schemaValidator(
      cleanProgressSchema,
      req.body
    );

    // Check if staff exists
    const staffCount = await prisma.staff.count({
      where: {
        staff_id: progressValidData.staff_id,
      },
    });

    if (!staffCount) {
      throw new BadRequestError("staff is not found");
    }

    // Check if report is exists

    const reportCount = await prisma.report.count({
      where: {
        report_id: progressValidData.report_id,
      },
    });

    if (!reportCount) {
      throw new BadRequestError("report is not found");
    }

    // Update and create transaction
    const data = await prisma.$transaction(async () => {
      const progressTrx = await prisma.cleaningProcess.create({
        data: {
          activity_id: "A".concat(Date.now().toString()),
          report_id: progressValidData.report_id,
          staff_id: progressValidData.staff_id,
        },
      });

      const updatedReport = await prisma.report.update({
        where: {
          report_id: progressTrx.report_id,
        },
        data: {
          report_status: "PROCESSED",
        },
      });

      return { ...progressTrx, ...updatedReport };
    });

    res.status(201).json({
      success: true,
      data: {
        actvity_id: data.activity_id,
      },
    });
  })
);

router.get(
  progressUrl,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const progressTrx = await prisma.cleaningProcess.findMany({
      select: {
        activity_id: true,
        evidence: true,
        created_at: true,
        finished_at: true,
        staff: {
          select: {
            staff_id: true,
            name: true,
          },
        },
        report: {
          select: {
            report_id: true,
            report_status: true,
            issued_by: {
              select: {
                user_id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: progressTrx,
    });
  })
);

router.patch(
  progressUrl,
  upload.single("trx"),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validCloseProgressData = await schemaValidator(
      closeProgressSchema,
      req.body
    );

    // Check if staff exists
    const staffCount = await prisma.staff.count({
      where: {
        staff_id: validCloseProgressData.staff_id,
      },
    });

    if (!staffCount) {
      throw new BadRequestError("staff is not found");
    }

    // Check if report is exists

    const reportCount = await prisma.report.count({
      where: {
        report_id: validCloseProgressData.report_id,
      },
    });

    if (!reportCount) {
      throw new BadRequestError("report is not found");
    }

    // Check activity id

    const activity = await prisma.cleaningProcess.findUnique({
      where: {
        activity_id: validCloseProgressData.activity_id,
      },
    });

    if (!activity) {
      throw new BadRequestError("activity is not found");
    }

    // Check trx evidence

    const trxEvidence = req.file;

    if (!trxEvidence) {
      throw new BadRequestError("Evidence is needed to close the report");
    }

    await prisma.$transaction(async () => {
      //Update trx data
      const updatedTrx = await prisma.cleaningProcess.update({
        where: {
          activity_id: activity.activity_id,
        },
        data: {
          evidence: "/".concat(
            req.file!.path.split("public\\")[1].replace("\\", "/")
          ),
          finished_at: new Date(),
        },
      });

      await prisma.report.update({
        where: {
          report_id: activity.report_id,
        },
        data: {
          report_status: "DONE",
          issued_by: {
            update: {
              point: {
                increment: 1,
              },
            },
          },
        },
      });
    });

    res.status(201).json({
      success: true,
      message: "Report completed",
    });
  })
);

export default router;
