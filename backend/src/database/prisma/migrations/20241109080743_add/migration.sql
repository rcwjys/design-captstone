/*
  Warnings:

  - Added the required column `evidence` to the `CleaningProcess` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CleaningProcess" ADD COLUMN     "evidence" TEXT NOT NULL;
