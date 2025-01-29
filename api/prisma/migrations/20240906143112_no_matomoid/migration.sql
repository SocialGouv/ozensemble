/*
  Warnings:

  - You are about to drop the column `matomo_id` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_matomo_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "matomo_id";
