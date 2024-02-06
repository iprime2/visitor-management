-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_id_key" ON "Feedback"("id");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
