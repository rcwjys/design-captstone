import { Request, Response, Router } from "express";
import asyncHandler from "../../helpers/asyncHandler";
import { schemaValidator } from "../../helpers/validator";
import authSchema from "./schema";
import { loginIgracias } from "../../helpers/loginIgracias";
import prisma from "../../database";
import { BadRequestError } from "../../core/ApiError";

const router = Router();

const accountUrl = "/api/account";

router.post(
  accountUrl,
  asyncHandler(async (req: Request, res: Response) => {
    // Get user credentials
    const requestBody = req.body;
    const validUserData = await schemaValidator(authSchema, requestBody);

    const { nim, ...userData } = await loginIgracias(
      validUserData.username,
      validUserData.password
    );

    if (nim) {
      // Find user in database
      const countUser = await prisma.user.count({
        where: {
          email: userData.email,
        },
      });

      if (!countUser) {
        // Register user to database
        const createdUser = await prisma.user.create({
          data: {
            user_id: "USR".concat(Date.now().toString()),
            name: userData.fullName,
            email: userData.email,
            class: userData.classInfo,
            major: userData.major,
            type: userData.userGroup,
            image_url: userData.imageUrl as string,
            point: 0,
          },
        });

        res.status(200).json({
          success: true,
          data: {
            email: userData.email,
            name: userData.fullName,
            class: userData.classInfo,
            major: userData.major,
            type: userData.userGroup,
            image_url: userData.imageUrl,
            point: createdUser.point,
          },
        });
      } else {
        // Find user
        const user = await prisma.user.findFirst({
          where: {
            email: userData.email,
          },
        });

        if (!user) throw new BadRequestError();

        const updatedUser = await prisma.user.update({
          where: {
            user_id: user.user_id,
          },
          data: {
            email: userData.email,
            name: userData.fullName,
            class: userData.classInfo,
            major: userData.major,
            type: userData.userGroup,
            image_url: userData.imageUrl as string,
          },
        });

        res.status(200).json({
          success: true,
          data: {
            email: userData.email,
            name: userData.fullName,
            class: userData.classInfo,
            major: userData.major,
            type: userData.userGroup,
            image_url: userData.imageUrl,
            point: updatedUser.point,
          },
        });
      }
    } else {
      res.status(400).json({
        success: "false",
        message: "yahh, akun mu nggak terdaftar",
      });
    }
  })
);

export default router;
