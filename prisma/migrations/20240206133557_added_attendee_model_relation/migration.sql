/*
  Warnings:

  - Added the required column `attendeeId` to the `Visitors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visitors" ADD COLUMN     "attendeeId" TEXT NOT NULL,
ADD COLUMN     "inTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "outTime" TIMESTAMP(3),
ALTER COLUMN "in" SET DEFAULT true,
ALTER COLUMN "out" SET DEFAULT false;

-- CreateTable
CREATE TABLE "Attendee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Attendee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visitors" ADD CONSTRAINT "Visitors_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
