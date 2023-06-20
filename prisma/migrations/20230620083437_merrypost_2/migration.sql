/*
  Warnings:

  - Made the column `link` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "link" SET NOT NULL,
ALTER COLUMN "link" SET DEFAULT '';
