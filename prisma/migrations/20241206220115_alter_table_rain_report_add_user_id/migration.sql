/*
  Warnings:

  - Added the required column `user_id` to the `rain_report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rain_report" ADD COLUMN     "user_id" TEXT NOT NULL;
