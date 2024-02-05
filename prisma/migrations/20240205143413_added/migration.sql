/*
  Warnings:

  - Added the required column `visitorPrn` to the `Visitors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visitors" ADD COLUMN     "visitorPrn" TEXT NOT NULL;
