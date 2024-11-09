import { NextFunction, Request, Response, Router } from "express";
import asyncHandler from "../../helpers/asyncHandler";
import { schemaValidator } from "../../helpers/validator";
import staffSchema, { staffAuthSchema } from "./schema";
import prisma from "../../database";
import {
  BadRequestError,
  InternalError,
  NotFoundError,
} from "../../core/ApiError";
import { compare, hash } from "bcryptjs";
import authSchema from "../profile/schema";

const router = Router();

const staffUrl = "/api/staffs";

type SchemaBody = {
  email: string;
  name: string;
  password: string;
};

router.post(
  staffUrl,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validStaffData: SchemaBody = await schemaValidator(
      staffSchema,
      req.body
    );

    // Check if the staff is exists
    const countStaff = await prisma.staff.count({
      where: {
        email: validStaffData.email,
      },
    });

    if (countStaff) {
      throw new BadRequestError("user is already exist");
    }

    const password = (async (): Promise<string> => {
      try {
        return await hash(validStaffData.password, 10);
      } catch (error) {
        throw new InternalError("failed to hash password");
      }
    })();

    const createdStaff = await prisma.staff.create({
      data: {
        staff_id: "S".concat(Date.now().toString()),
        email: validStaffData.email,
        name: validStaffData.name,
        role: "STAFF",
        password: await password,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        name: createdStaff.name,
      },
    });
  })
);

router.post(
  staffUrl.concat("/auth"),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validBody: SchemaBody = await schemaValidator(
      staffAuthSchema,
      req.body
    );

    // check if user exists

    const countStaff = await prisma.staff.count({
      where: {
        email: validBody.email,
      },
    });

    if (!countStaff) {
      throw new BadRequestError("email or password is wrong");
    }

    const staff = await prisma.staff.findFirst({
      where: {
        email: validBody.email,
      },
    });

    if (!staff) {
      throw new NotFoundError("Staff is not exists");
    }

    const isMatch = await compare(validBody.password, staff!.password);

    if (!isMatch) {
      throw new BadRequestError("email or password is wrong");
    }

    res.status(200).json({
      success: true,
      data: {
        staff_id: staff.staff_id,
        email: staff.email,
        name: staff.name,
        role: staff.role,
      },
    });
  })
);

export default router;
