/*
  Warnings:

  - Added the required column `claim_status` to the `claim_reward_trx` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClaimRewardStatus" AS ENUM ('PROCESS', 'COMPLETE');

-- AlterTable
ALTER TABLE "claim_reward_trx" ADD COLUMN     "claim_status" "ClaimRewardStatus" NOT NULL;
