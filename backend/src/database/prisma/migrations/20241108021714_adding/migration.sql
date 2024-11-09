/*
  Warnings:

  - Added the required column `report_status` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('OPEN', 'PROCESSED', 'DONE');

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "report_status" "ReportStatus" NOT NULL;
