/*
  Warnings:

  - You are about to drop the `Castle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Download` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Guild` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Castle" DROP CONSTRAINT "Castle_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Character" DROP CONSTRAINT "Character_guildId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Guild" DROP CONSTRAINT "Guild_masterId_fkey";

-- DropTable
DROP TABLE "public"."Castle";

-- DropTable
DROP TABLE "public"."Download";

-- DropTable
DROP TABLE "public"."Guild";
