/*
  Warnings:

  - You are about to drop the column `modals` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "modals";

-- CreateTable
CREATE TABLE "AppUserMilestone" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppUserMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AppUserMilestone_id_idx" ON "AppUserMilestone" USING HASH ("id");

-- AddForeignKey
ALTER TABLE "AppUserMilestone" ADD CONSTRAINT "AppUserMilestone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
