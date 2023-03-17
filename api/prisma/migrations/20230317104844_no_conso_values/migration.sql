/*
  Warnings:

  - You are about to drop the column `modals` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AppMilestone" RENAME CONSTRAINT "AppUserMilestone_pkey" TO "AppMilestone_pkey";

-- AlterTable
ALTER TABLE "Consommation" ALTER COLUMN "quantity" SET DEFAULT 0,
ALTER COLUMN "doses" SET DEFAULT 0,
ALTER COLUMN "kcal" SET DEFAULT 0,
ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "modals";

-- RenameForeignKey
ALTER TABLE "AppMilestone" RENAME CONSTRAINT "AppUserMilestone_userId_fkey" TO "AppMilestone_userId_fkey";

-- RenameIndex
ALTER INDEX "AppUserMilestone_id_idx" RENAME TO "AppMilestone_id_idx";
