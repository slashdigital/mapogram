-- CreateTable
CREATE TABLE "MapType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "layout" TEXT,

    CONSTRAINT "MapType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Generation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "outputPath" TEXT,
    "zoomLevel" TEXT,
    "command" TEXT,
    "layout" TEXT,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    "sessionId" TEXT,
    "submitted" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT,
    "mapTypeId" INTEGER,

    CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_mapTypeId_fkey" FOREIGN KEY ("mapTypeId") REFERENCES "MapType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
