/*
  Warnings:

  - Added the required column `in` to the `Visitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `out` to the `Visitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `query` to the `Visitors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visitors" ADD COLUMN     "in" BOOLEAN NOT NULL,
ADD COLUMN     "out" BOOLEAN NOT NULL,
ADD COLUMN     "query" TEXT NOT NULL;
