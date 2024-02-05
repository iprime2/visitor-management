/*
  Warnings:

  - You are about to drop the column `StudentAndEmployeeId` on the `Visitors` table. All the data in the column will be lost.
  - You are about to drop the `StudentAndEmployee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Visitors" DROP CONSTRAINT "Visitors_StudentAndEmployeeId_fkey";

-- AlterTable
ALTER TABLE "Visitors" DROP COLUMN "StudentAndEmployeeId",
ADD COLUMN     "dataId" TEXT;

-- DropTable
DROP TABLE "StudentAndEmployee";

-- CreateTable
CREATE TABLE "Data" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prn" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visitors" ADD CONSTRAINT "Visitors_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
