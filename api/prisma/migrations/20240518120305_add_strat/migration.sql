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
CREATE INDEX "Strategy_userId_idx" ON "Strategy" USING HASH ("userId");

-- AddForeignKey
ALTER TABLE "Strategy" ADD CONSTRAINT "Strategy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
