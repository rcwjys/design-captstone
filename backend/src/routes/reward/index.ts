import { NextFunction, Request, Response, Router } from "express";
import asyncHandler from "../../helpers/asyncHandler";
import { schemaValidator } from "../../helpers/validator";
import rewardSchema, { rewardsUpdateSchema } from "./schema";
import prisma from "../../database";
import { BadRequestError, NotFoundError } from "../../core/ApiError";
import upload from "../../helpers/multer";

const router = Router();

type RewardBody = {
  reward_name: string;
  reward_stock: number;
  reward_price: number;
};

const rewardUrl = "/api/rewards";

// Create reward
router.post(
  rewardUrl,
  upload.single("reward"),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validRewardData: RewardBody = await schemaValidator(rewardSchema, {
      reward_name: req.body.reward_name,
      reward_stock: parseInt(req.body.reward_stock),
      reward_price: parseInt(req.body.reward_price),
    });

    if (!req.file) {
      throw new BadRequestError("rewards image not attached");
    }

    const countReward = await prisma.reward.count({
      where: {
        reward_name: validRewardData.reward_name.toLowerCase(),
      },
    });

    if (countReward) {
      throw new BadRequestError("reward is already exists");
    }

    const reward = await prisma.reward.create({
      data: {
        reward_id: "RW".concat(Date.now().toString()),
        reward_img: "/".concat(
          req.file!.path.split("public\\")[1].replace("\\", "/")
        ),
        reward_name: validRewardData.reward_name.toLowerCase(),
        reward_price: validRewardData.reward_price,
        reward_stock: validRewardData.reward_stock,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        reward_id: reward.reward_id,
        reward_name: reward.reward_name,
        reward_price: reward.reward_price,
        reward_stock: reward.reward_stock,
      },
    });
  })
);

// Get all reward
router.get(
  rewardUrl,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const rewards = await prisma.reward.findMany();

    const formattedRewards = rewards.map((reward) => ({
      reward_id: reward.reward_id,
      reward_name: reward.reward_name,
      reward_stock: reward.reward_stock,
      reward_price: reward.reward_price,
    }));

    res.status(200).json({
      success: true,
      data: formattedRewards,
    });
  })
);

// Get specific rewards
router.get(
  rewardUrl.concat("/:id"),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Check id if exists
    const rewardId = req.params.id;

    if (!rewardId) {
      throw new BadRequestError("reward id is required");
    }

    // check if the reward with id above is exists
    const rewardCount = await prisma.reward.count({
      where: {
        reward_id: rewardId,
      },
    });

    if (!rewardCount) {
      throw new NotFoundError("Reward is not found");
    }

    const reward = await prisma.reward.findUnique({
      where: {
        reward_id: rewardId,
      },
    });

    res.status(200).json({
      success: true,
      data: reward,
    });
  })
);

// update rewards
router.patch(
  rewardUrl.concat("/:id"),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const rewardId = req.params.id;
    // Check rewards id is exists
    if (!rewardId) {
      throw new BadRequestError("rewards id is required");
    }

    // Check the rewards is exists in database

    const countRewards = await prisma.reward.count({
      where: {
        reward_id: rewardId,
      },
    });

    if (!countRewards) {
      throw new NotFoundError("reward is not found");
    }

    // Check the body
    const validRewardData: RewardBody = await schemaValidator(
      rewardsUpdateSchema,
      req.body
    );

    const updateReward = await prisma.reward.update({
      where: {
        reward_id: rewardId,
      },
      data: {
        reward_name: validRewardData.reward_name,
        reward_price: validRewardData.reward_price,
        reward_stock: validRewardData.reward_stock,
      },
    });

    res.status(200).json({
      success: true,
      data: updateReward,
    });
  })
);

// Delete rewards
router.delete(
  rewardUrl.concat("/:id"),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const rewardId = req.params.id;
    // Check if rewards id is exist
    if (!rewardId) {
      throw new BadRequestError("Reward id is required");
    }

    // Check if the reward exist in database

    const rewardCount = await prisma.reward.count({
      where: {
        reward_id: rewardId,
      },
    });

    if (!rewardCount) {
      throw new NotFoundError("Reward is not found");
    }

    const deletedReward = await prisma.reward.delete({
      where: {
        reward_id: rewardId,
      },
    });

    res.status(200).json({
      success: true,
      data: deletedReward,
    });
  })
);

export default router;
