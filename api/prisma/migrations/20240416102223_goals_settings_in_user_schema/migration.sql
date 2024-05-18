-- AlterTable
ALTER TABLE
  "User"
ADD
  COLUMN "goal_daysWithGoalNoDrink" TEXT [] DEFAULT ARRAY [] :: TEXT [],
ADD
  COLUMN "goal_dosesByDrinkingDay" DOUBLE PRECISION,
ADD
  COLUMN "goal_dosesPerWeek" DOUBLE PRECISION,
ADD
  COLUMN "goal_isSetup" BOOLEAN NOT NULL DEFAULT false;