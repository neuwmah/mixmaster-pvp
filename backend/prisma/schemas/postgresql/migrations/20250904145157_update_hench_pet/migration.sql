/*
  Warnings:

  - You are about to drop the column `description` on the `Hench` table. All the data in the column will be lost.
  - You are about to drop the column `rarity` on the `Hench` table. All the data in the column will be lost.
  - You are about to drop the column `templateId` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `type` to the `Hench` table without a default value. This is not possible if the table is not empty.
  - Added the required column `henchId` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_templateId_fkey";

-- DropIndex
DROP INDEX "Pet_templateId_idx";

-- AlterTable
ALTER TABLE "Hench" DROP COLUMN "description",
DROP COLUMN "rarity",
ADD COLUMN     "icon_url" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "templateId",
ADD COLUMN     "henchId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Pet_henchId_idx" ON "Pet"("henchId");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_henchId_fkey" FOREIGN KEY ("henchId") REFERENCES "Hench"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
