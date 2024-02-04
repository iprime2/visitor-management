-- CreateTable
CREATE TABLE "StudentAndEmployee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAndEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "visitorPrn" TEXT NOT NULL,
    "visitorName" TEXT NOT NULL,
    "in" BOOLEAN NOT NULL DEFAULT true,
    "out" BOOLEAN NOT NULL DEFAULT false,
    "inTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "StudentAndEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
