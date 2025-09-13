/*
  Warnings:

  - You are about to drop the `Hench` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Pet" DROP CONSTRAINT "Pet_characterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Pet" DROP CONSTRAINT "Pet_henchId_fkey";

-- DropTable
DROP TABLE "public"."Hench";

-- DropTable
DROP TABLE "public"."Pet";

-- DropEnum
DROP TYPE "public"."HenchType";
