/*
  Warnings:

  - You are about to drop the column `visitorId` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the `StudentAndEmployee` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `StudentAndEmployeId` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_visitorId_fkey";

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "visitorId",
ADD COLUMN     "StudentAndEmployeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "StudentAndEmployee";

-- CreateTable
CREATE TABLE "StudentAndEmploye" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAndEmploye_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_StudentAndEmployeId_fkey" FOREIGN KEY ("StudentAndEmployeId") REFERENCES "StudentAndEmploye"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
