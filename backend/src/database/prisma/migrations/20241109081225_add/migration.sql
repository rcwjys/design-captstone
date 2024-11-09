/*
  Warnings:

  - You are about to drop the `CleaningProcess` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CleaningProcess" DROP CONSTRAINT "CleaningProcess_report_id_fkey";

-- DropForeignKey
ALTER TABLE "CleaningProcess" DROP CONSTRAINT "CleaningProcess_staff_id_fkey";

-- DropTable
DROP TABLE "CleaningProcess";

-- DropTable
DROP TABLE "Staff";

-- CreateTable
CREATE TABLE "staffs" (
    "staff_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "staffs_pkey" PRIMARY KEY ("staff_id")
);

-- CreateTable
CREATE TABLE "cleaning_progress_trx" (
    "activity_id" TEXT NOT NULL,
    "evidence" TEXT NOT NULL,
    "report_id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cleaning_progress_trx_pkey" PRIMARY KEY ("activity_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staffs_email_name_key" ON "staffs"("email", "name");

-- AddForeignKey
ALTER TABLE "cleaning_progress_trx" ADD CONSTRAINT "cleaning_progress_trx_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("staff_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cleaning_progress_trx" ADD CONSTRAINT "cleaning_progress_trx_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("report_id") ON DELETE NO ACTION ON UPDATE CASCADE;
