/*
  Warnings:

  - Added the required column `claim_qty` to the `claim_reward_trx` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "claim_reward_trx" ADD COLUMN     "claim_qty" INTEGER NOT NULL;
