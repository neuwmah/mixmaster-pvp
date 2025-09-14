/*
  Warnings:

  - You are about to drop the column `day` on the `Castle` table. All the data in the column will be lost.
  - Added the required column `weekday` to the `Castle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Castle" DROP COLUMN "day",
ADD COLUMN     "weekday" TEXT NOT NULL;
