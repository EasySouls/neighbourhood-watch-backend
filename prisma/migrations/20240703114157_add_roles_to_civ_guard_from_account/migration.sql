/*
  Warnings:

  - You are about to drop the column `role` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "CivilGuard" ADD COLUMN     "roles" "Role"[];
