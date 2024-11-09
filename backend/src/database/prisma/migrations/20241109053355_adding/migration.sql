/*
  Warnings:

  - Added the required column `reward_img` to the `rewards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rewards" ADD COLUMN     "reward_img" TEXT NOT NULL;
