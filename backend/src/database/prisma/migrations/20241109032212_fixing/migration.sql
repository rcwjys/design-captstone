/*
  Warnings:

  - The `created_at` column on the `claim_reward_trx` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "claim_reward_trx" DROP COLUMN "created_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "reports" ALTER COLUMN "report_status" SET DEFAULT 'OPEN';
