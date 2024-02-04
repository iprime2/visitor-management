/*
  Warnings:

  - You are about to drop the column `StudentAndEmployeId` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the `StudentAndEmploye` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `StudentAndEmployeeId` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_StudentAndEmployeId_fkey";

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "StudentAndEmployeId",
ADD COLUMN     "StudentAndEmployeeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "StudentAndEmploye";

-- CreateTable
CREATE TABLE "StudentAndEmployee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAndEmployee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_StudentAndEmployeeId_fkey" FOREIGN KEY ("StudentAndEmployeeId") REFERENCES "StudentAndEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
