import { NextFunction, Request, Response, Router } from "express";
import asyncHandler from "../../helpers/asyncHandler";
import { schemaValidator } from "../../helpers/validator";
import reportSchema from "./schema";
import prisma from "../../database";
import upload from "../../helpers/multer";
import { BadRequestError, NotFoundError } from "../../core/ApiError";

const router = Router();

type ReportBody = {
  description: string;
  location_detail: string;
  user_id: string;
};

router.post(
  "/api/reports",
  upload.single("evidence"),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validReportData: ReportBody = await schemaValidator(
      reportSchema,
      req.body
    );

    if (!req.file) {
      throw new BadRequestError("evidence not attached");
    }

    // Check user exists
    const user = await prisma.user.count({
      where: {
        user_id: validReportData.user_id,
      },
    });

    if (!user) {
      throw new BadRequestError("user is not found");
    }

    // create the report and add point to user
    await prisma.$transaction(async (prisma) => {
      // Check evidence

      const createdReport = await prisma.report.create({
        data: {
          report_id: "R".concat(Date.now().toString()),
          evidence: "/".concat(
            req.file!.path.split("public\\")[1].replace("\\", "/")
          ),
          description: validReportData.description,
          report_status: "OPEN",
          location_detail: validReportData.location_detail,
          user_id: validReportData.user_id,
        },
      });

      await prisma.user.update({
        where: {
          user_id: createdReport.user_id,
        },
        data: {
          point: {
            increment: 1,
          },
        },
      });
    });

    res.status(201).json({
      success: true,
      message: "Report created successfully",
    });
  })
);

router.get(
  "/api/reports",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.query.id;

    if (userId === undefined) {
      const reports = (
        await prisma.report.findMany({
          orderBy: {
            created_at: "desc",
          },
        })
      ).map((report) => ({
        report_id: report.report_id,
        location_detail: report.location_detail,
        evidence: report.evidence,
        report_status: report.report_status,
        description: report.description,
        created_at: report.created_at,
      }));

      res.status(200).json({
        success: true,
        data: reports,
      });

      return;
    }

    if (typeof userId !== "string") {
      throw new BadRequestError("Invalid user ID format");
    }

    const regex = /^USRd+$/;

    // sanitize the query params
    if (regex.test(userId)) {
      throw new BadRequestError("invalid user ID format");
    }

    // Check is valid users ?
    const user = await prisma.user.count({
      where: {
        user_id: userId,
      },
    });

    if (user === 0) {
      throw new BadRequestError("User is not registered");
    }

    // Get the reports created by user
    const reports = await prisma.report.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        report_id: true,
        location_detail: true,
        created_at: true,
        report_status: true,
      },
    });

    res.status(200).json({
      success: true,
      data: reports,
    });
  })
);

router.get(
  "/api/reports/:reportId",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const reportId = req.params.reportId;

    // check is report id available
    if (!reportId) {
      throw new BadRequestError("report id is required");
    }

    // check if the report based report id below exists
    const reportCount = await prisma.report.count();

    if (!reportCount) {
      throw new NotFoundError("Report is not found");
    }

    const reports = await prisma.report.findUnique({
      where: {
        report_id: reportId,
      },
      include: {
        process: {
          include: {
            staff: {
              select: {
                staff_id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: reports,
    });
  })
);

export default router;
