/*
  Warnings:

  - You are about to drop the column `modals` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AppMilestone" RENAME CONSTRAINT "AppUserMilestone_pkey" TO "AppMilestone_pkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN IF EXISTS "modals",
ADD COLUMN     "created_from" TEXT NOT NULL DEFAULT '';
