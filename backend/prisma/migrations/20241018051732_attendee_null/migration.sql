-- DropForeignKey
ALTER TABLE "Visitors" DROP CONSTRAINT "Visitors_attendeeId_fkey";

-- AlterTable
ALTER TABLE "Visitors" ALTER COLUMN "attendeeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Visitors" ADD CONSTRAINT "Visitors_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
