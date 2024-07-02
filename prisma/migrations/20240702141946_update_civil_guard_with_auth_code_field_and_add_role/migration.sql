/*
  Warnings:

  - A unique constraint covering the columns `[authCode]` on the table `CivilGuard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authCode` to the `CivilGuard` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DEP_HEAD', 'CIVIL_GUARD');

-- DropForeignKey
ALTER TABLE "CivilGuard" DROP CONSTRAINT "CivilGuard_accountId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CIVIL_GUARD';

-- AlterTable
ALTER TABLE "CivilGuard" ADD COLUMN     "authCode" INTEGER NOT NULL,
ALTER COLUMN "accountId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CivilGuard_authCode_key" ON "CivilGuard"("authCode");

-- AddForeignKey
ALTER TABLE "CivilGuard" ADD CONSTRAINT "CivilGuard_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
