-- CreateTable
CREATE TABLE "DrinksContext" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT NOT NULL DEFAULT '',
    "context" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "emotion" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DrinksContext_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DrinksContext_userId_idx" ON "DrinksContext" USING HASH ("userId");

-- CreateIndex
CREATE INDEX "Goal_userId_date_idx" ON "Goal"("userId", "date");

-- AddForeignKey
ALTER TABLE "DrinksContext" ADD CONSTRAINT "DrinksContext_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
