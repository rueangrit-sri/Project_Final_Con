/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rolePermission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role_id" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "role";

-- DropTable
DROP TABLE "rolePermission";
