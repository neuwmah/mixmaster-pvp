-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "transferPending" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "transferRequestedAt" TIMESTAMP(3),
ADD COLUMN     "transferTargetUserId" TEXT;

-- CreateIndex
CREATE INDEX "Character_transferTargetUserId_idx" ON "Character"("transferTargetUserId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_transferTargetUserId_fkey" FOREIGN KEY ("transferTargetUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
