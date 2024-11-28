/*
  Warnings:

  - The values [DONE] on the enum `ReportStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReportStatus_new" AS ENUM ('OPEN', 'PROCESSED', 'CLOSED');
ALTER TABLE "reports" ALTER COLUMN "report_status" DROP DEFAULT;
ALTER TABLE "reports" ALTER COLUMN "report_status" TYPE "ReportStatus_new" USING ("report_status"::text::"ReportStatus_new");
ALTER TYPE "ReportStatus" RENAME TO "ReportStatus_old";
ALTER TYPE "ReportStatus_new" RENAME TO "ReportStatus";
DROP TYPE "ReportStatus_old";
ALTER TABLE "reports" ALTER COLUMN "report_status" SET DEFAULT 'OPEN';
COMMIT;
