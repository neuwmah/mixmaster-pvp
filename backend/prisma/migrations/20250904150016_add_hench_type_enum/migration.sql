/*
  Warnings:

  - Changed the type of `type` on the `Hench` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HenchType" AS ENUM ('ditt', 'jin', 'penril', 'phoy');

-- AlterTable
ALTER TABLE "Hench" DROP COLUMN "type",
ADD COLUMN     "type" "HenchType" NOT NULL;
