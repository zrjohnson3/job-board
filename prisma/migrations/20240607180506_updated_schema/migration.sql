/*
  Warnings:

  - You are about to drop the column `url` on the `jobs` table. All the data in the column will be lost.
  - Added the required column `type` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "url",
ADD COLUMN     "type" TEXT NOT NULL;
