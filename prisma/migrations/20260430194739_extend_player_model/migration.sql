/*
  Warnings:

  - Added the required column `role` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "apps" INTEGER,
ADD COLUMN     "assists" INTEGER,
ADD COLUMN     "compareStats" JSONB,
ADD COLUMN     "fifaStats" JSONB,
ADD COLUMN     "goals" INTEGER,
ADD COLUMN     "lastGames" JSONB,
ADD COLUMN     "minutes" INTEGER,
ADD COLUMN     "radarStats" JSONB,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "transferValues" JSONB;
