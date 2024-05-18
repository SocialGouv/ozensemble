/*
  Warnings:

  - A unique constraint covering the columns `[userId,category,stars]` on the table `Badge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Badge_userId_category_stars_key" ON "Badge"("userId", "category", "stars");
