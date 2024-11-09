/*
  Warnings:

  - You are about to drop the column `lecture` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `page_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username,name,email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_username_name_email_page_id_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "lecture",
DROP COLUMN "page_id";

-- CreateIndex
CREATE UNIQUE INDEX "users_username_name_email_key" ON "users"("username", "name", "email");
