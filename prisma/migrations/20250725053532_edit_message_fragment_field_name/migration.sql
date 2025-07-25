/*
  Warnings:

  - You are about to drop the column `createAt` on the `Fragment` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Fragment` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Message` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Fragment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fragment" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
