-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('NotSent', 'Sent', 'Canceled', 'Failed');

-- CreateEnum
CREATE TYPE "ReminderType" AS ENUM ('Daily', 'Weekdays');

-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('Success', 'Failure', 'InProgress');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "matomo_id" TEXT NOT NULL,
    "push_notif_token" TEXT NOT NULL DEFAULT '',
    "goal_isSetup" BOOLEAN NOT NULL DEFAULT false,
    "goal_daysWithGoalNoDrink" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "goal_dosesByDrinkingDay" DOUBLE PRECISION,
    "goal_dosesPerWeek" DOUBLE PRECISION,
    "lastConsoAdded" TIMESTAMP(3),
    "created_from" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appVersion" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'NotSent',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ReminderType" NOT NULL DEFAULT 'Daily',
    "utcTimeHours" INTEGER NOT NULL DEFAULT 0,
    "utcTimeMinutes" INTEGER NOT NULL DEFAULT 0,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReminderUtcDaysOfWeek" (
    "id" TEXT NOT NULL,
    "reminderId" TEXT NOT NULL,
    "sunday" BOOLEAN NOT NULL DEFAULT false,
    "monday" BOOLEAN NOT NULL DEFAULT false,
    "tuesday" BOOLEAN NOT NULL DEFAULT false,
    "wednesday" BOOLEAN NOT NULL DEFAULT false,
    "thursday" BOOLEAN NOT NULL DEFAULT false,
    "friday" BOOLEAN NOT NULL DEFAULT false,
    "saturday" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ReminderUtcDaysOfWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "date" TEXT NOT NULL DEFAULT '',
    "shown" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consommation" (
    "id" TEXT NOT NULL,
    "drinkKey" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "doses" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "kcal" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "volume" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consommation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinksContext" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "context" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "emotion" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DrinksContext_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "daysWithGoalNoDrink" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dosesByDrinkingDay" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dosesPerWeek" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL DEFAULT '',
    "status" "GoalStatus" NOT NULL DEFAULT 'InProgress',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppMilestone" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinksContextRequest" (
    "id" TEXT NOT NULL,
    "matomo_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DrinksContextRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Strategy" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "index" DOUBLE PRECISION NOT NULL,
    "feelings" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "trigger" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "intensity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "actionPlan" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Strategy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_matomo_id_key" ON "User"("matomo_id");

-- CreateIndex
CREATE INDEX "User_push_notif_token_idx" ON "User" USING HASH ("push_notif_token");

-- CreateIndex
CREATE INDEX "Notification_id_idx" ON "Notification"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reminder_userId_key" ON "Reminder"("userId");

-- CreateIndex
CREATE INDEX "Reminder_type_idx" ON "Reminder" USING HASH ("type");

-- CreateIndex
CREATE INDEX "Reminder_type_id_idx" ON "Reminder"("type", "id");

-- CreateIndex
CREATE INDEX "Reminder_utcTimeHours_utcTimeMinutes_idx" ON "Reminder"("utcTimeHours", "utcTimeMinutes");

-- CreateIndex
CREATE UNIQUE INDEX "ReminderUtcDaysOfWeek_reminderId_key" ON "ReminderUtcDaysOfWeek"("reminderId");

-- CreateIndex
CREATE INDEX "ReminderUtcDaysOfWeek_sunday_idx" ON "ReminderUtcDaysOfWeek" USING HASH ("sunday");

-- CreateIndex
CREATE INDEX "ReminderUtcDaysOfWeek_monday_idx" ON "ReminderUtcDaysOfWeek" USING HASH ("monday");

-- CreateIndex
CREATE INDEX "ReminderUtcDaysOfWeek_tuesday_idx" ON "ReminderUtcDaysOfWeek" USING HASH ("tuesday");

-- CreateIndex
CREATE INDEX "ReminderUtcDaysOfWeek_wednesday_idx" ON "ReminderUtcDaysOfWeek" USING HASH ("wednesday");

-- CreateIndex
CREATE INDEX "ReminderUtcDaysOfWeek_thursday_idx" ON "ReminderUtcDaysOfWeek" USING HASH ("thursday");

-- CreateIndex
CREATE INDEX "ReminderUtcDaysOfWeek_friday_idx" ON "ReminderUtcDaysOfWeek" USING HASH ("friday");

-- CreateIndex
CREATE INDEX "ReminderUtcDaysOfWeek_saturday_idx" ON "ReminderUtcDaysOfWeek" USING HASH ("saturday");

-- CreateIndex
CREATE INDEX "Badge_userId_idx" ON "Badge" USING HASH ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_userId_category_stars_key" ON "Badge"("userId", "category", "stars");

-- CreateIndex
CREATE INDEX "Consommation_userId_idx" ON "Consommation" USING HASH ("userId");

-- CreateIndex
CREATE INDEX "DrinksContext_userId_idx" ON "DrinksContext" USING HASH ("userId");

-- CreateIndex
CREATE INDEX "Goal_id_idx" ON "Goal" USING HASH ("id");

-- CreateIndex
CREATE INDEX "Goal_userId_date_idx" ON "Goal"("userId", "date");

-- CreateIndex
CREATE INDEX "AppMilestone_id_idx" ON "AppMilestone" USING HASH ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Article_userId_title_key" ON "Article"("userId", "title");

-- CreateIndex
CREATE INDEX "DrinksContextRequest_category_idx" ON "DrinksContextRequest" USING HASH ("category");

-- CreateIndex
CREATE INDEX "DrinksContextRequest_context_idx" ON "DrinksContextRequest" USING HASH ("context");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReminderUtcDaysOfWeek" ADD CONSTRAINT "ReminderUtcDaysOfWeek_reminderId_fkey" FOREIGN KEY ("reminderId") REFERENCES "Reminder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consommation" ADD CONSTRAINT "Consommation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinksContext" ADD CONSTRAINT "DrinksContext_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppMilestone" ADD CONSTRAINT "AppMilestone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinksContextRequest" ADD CONSTRAINT "DrinksContextRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD CONSTRAINT "Strategy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
