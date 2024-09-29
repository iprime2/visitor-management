/*
  Warnings:

  - You are about to drop the `Data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Visitors" DROP CONSTRAINT "Visitors_dataId_fkey";

-- DropTable
DROP TABLE "Data";

-- CreateTable
CREATE TABLE "CollegeMembers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prn" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollegeMembers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visitors" ADD CONSTRAINT "Visitors_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "CollegeMembers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
