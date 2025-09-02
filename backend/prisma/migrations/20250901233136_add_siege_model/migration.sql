-- CreateTable
CREATE TABLE "Castle" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "time" TIME(6) NOT NULL,

    CONSTRAINT "Castle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Castle_city_key" ON "Castle"("city");

-- CreateIndex
CREATE INDEX "Castle_ownerId_idx" ON "Castle"("ownerId");

-- AddForeignKey
ALTER TABLE "Castle" ADD CONSTRAINT "Castle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
