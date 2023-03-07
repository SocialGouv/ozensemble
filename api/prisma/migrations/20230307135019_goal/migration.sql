-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('Success', 'Failure', 'InProgress');

-- AlterTable
ALTER TABLE "Badge" ADD COLUMN     "shown" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "daysWithGoalNoDrink" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dosesByDrinkingDay" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL DEFAULT '',
    "status" "GoalStatus" NOT NULL DEFAULT 'InProgress',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Goal_id_idx" ON "Goal" USING HASH ("id");

-- CreateIndex
CREATE INDEX "Badge_userId_idx" ON "Badge" USING HASH ("userId");

-- CreateIndex
CREATE INDEX "Consommation_userId_idx" ON "Consommation" USING HASH ("userId");

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
