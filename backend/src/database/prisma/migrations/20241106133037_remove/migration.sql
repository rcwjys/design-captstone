/*
  Warnings:

  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_username_name_email_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "username";

-- CreateIndex
CREATE UNIQUE INDEX "users_name_email_key" ON "users"("name", "email");
