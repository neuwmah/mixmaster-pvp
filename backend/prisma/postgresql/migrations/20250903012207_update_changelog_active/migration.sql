/*
  Warnings:

  - You are about to drop the column `is_active` on the `Changelog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Changelog" DROP COLUMN "is_active",
ADD COLUMN     "active" BOOLEAN DEFAULT true;
