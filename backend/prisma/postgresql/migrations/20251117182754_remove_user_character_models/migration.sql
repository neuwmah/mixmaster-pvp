/*
  Warnings:

  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Character" DROP CONSTRAINT "Character_transferTargetUserId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Character" DROP CONSTRAINT "Character_userId_fkey";

-- DropTable
DROP TABLE "public"."Character";

-- DropTable
DROP TABLE "public"."User";

-- DropEnum
DROP TYPE "public"."CharacterClass";
