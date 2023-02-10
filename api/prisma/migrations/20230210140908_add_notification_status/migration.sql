/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Reminder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('NotSent', 'Sent', 'Canceled', 'Failed');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "status" "NotificationStatus" NOT NULL DEFAULT 'NotSent';

-- CreateIndex
CREATE UNIQUE INDEX "Reminder_userId_key" ON "Reminder"("userId");
