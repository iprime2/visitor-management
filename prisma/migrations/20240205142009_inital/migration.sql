-- CreateTable
CREATE TABLE "StudentAndEmployee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prn" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAndEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitors" (
    "id" TEXT NOT NULL,
    "visitorId" SERIAL NOT NULL,
    "StudentAndEmployeeId" TEXT,
    "visitorName" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "attendedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitors_id_key" ON "Visitors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Visitors_visitorId_key" ON "Visitors"("visitorId");

-- AddForeignKey
ALTER TABLE "Visitors" ADD CONSTRAINT "Visitors_StudentAndEmployeeId_fkey" FOREIGN KEY ("StudentAndEmployeeId") REFERENCES "StudentAndEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
