/*
  Warnings:

  - The values [ditt,jin,penril,phoy] on the enum `HenchType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HenchType_new" AS ENUM ('dragon', 'beast', 'insect', 'metal', 'mystery', 'devil', 'bird', 'plant');
ALTER TABLE "Hench" ALTER COLUMN "type" TYPE "HenchType_new" USING ("type"::text::"HenchType_new");
ALTER TYPE "HenchType" RENAME TO "HenchType_old";
ALTER TYPE "HenchType_new" RENAME TO "HenchType";
DROP TYPE "HenchType_old";
COMMIT;
