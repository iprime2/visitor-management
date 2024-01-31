/*
  Warnings:

  - The `visitorId` column on the `Visitor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "visitorId",
ADD COLUMN     "visitorId" SERIAL NOT NULL;
