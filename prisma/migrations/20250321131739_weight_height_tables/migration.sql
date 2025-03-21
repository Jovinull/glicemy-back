-- CreateTable
CREATE TABLE "WeightRecord" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeightRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeightRecord" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HeightRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WeightRecord_userId_idx" ON "WeightRecord"("userId");

-- CreateIndex
CREATE INDEX "HeightRecord_userId_idx" ON "HeightRecord"("userId");

-- AddForeignKey
ALTER TABLE "WeightRecord" ADD CONSTRAINT "WeightRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeightRecord" ADD CONSTRAINT "HeightRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
