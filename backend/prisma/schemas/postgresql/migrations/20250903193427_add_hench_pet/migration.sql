-- CreateTable
CREATE TABLE "Hench" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "rarity" TEXT,
    "base_level" INTEGER NOT NULL DEFAULT 1,
    "base_exp" INTEGER NOT NULL DEFAULT 0,
    "sprite_url" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Hench_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nickname" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "characterId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "in_party" BOOLEAN NOT NULL DEFAULT false,
    "slot" INTEGER,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hench_code_key" ON "Hench"("code");

-- CreateIndex
CREATE INDEX "Hench_active_idx" ON "Hench"("active");

-- CreateIndex
CREATE INDEX "Pet_characterId_idx" ON "Pet"("characterId");

-- CreateIndex
CREATE INDEX "Pet_templateId_idx" ON "Pet"("templateId");

-- CreateIndex
CREATE INDEX "Pet_in_party_idx" ON "Pet"("in_party");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Hench"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
