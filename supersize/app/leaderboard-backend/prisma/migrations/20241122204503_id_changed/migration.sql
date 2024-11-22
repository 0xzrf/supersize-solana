/*
  Warnings:

  - The primary key for the `Winning` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Winning` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Winning" DROP CONSTRAINT "Winning_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Winning_pkey" PRIMARY KEY ("userWalletAddress");
