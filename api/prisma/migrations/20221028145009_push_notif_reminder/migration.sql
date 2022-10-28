-- CreateEnum
CREATE TYPE "ReminderType" AS ENUM ('Daily', 'Weekdays');

-- CreateTable
CREATE TABLE "PushUser" (
    "id" TEXT NOT NULL,
    "pushNotifToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PushUser_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "PushUser_pushNotifToken_key" ON "PushUser"("pushNotifToken");

-- CreateIndex
CREATE INDEX "PushUser_pushNotifToken_idx" ON "PushUser" USING HASH ("pushNotifToken");

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

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PushUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReminderUtcDaysOfWeek" ADD CONSTRAINT "ReminderUtcDaysOfWeek_reminderId_fkey" FOREIGN KEY ("reminderId") REFERENCES "Reminder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
