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

-- CreateIndex
CREATE INDEX "DrinksContextRequest_category_idx" ON "DrinksContextRequest" USING HASH ("category");

-- CreateIndex
CREATE INDEX "DrinksContextRequest_context_idx" ON "DrinksContextRequest" USING HASH ("context");

-- AddForeignKey
ALTER TABLE "DrinksContextRequest" ADD CONSTRAINT "DrinksContextRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
