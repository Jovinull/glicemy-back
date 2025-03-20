/*
  Warnings:

  - Added the required column `diabetesTypeId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diagnosisYear` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "diabetesTypeId" INTEGER NOT NULL,
ADD COLUMN     "diagnosisYear" INTEGER NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "DiabetesType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiabetesType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_diabetesTypeId_idx" ON "User"("diabetesTypeId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_diabetesTypeId_fkey" FOREIGN KEY ("diabetesTypeId") REFERENCES "DiabetesType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
