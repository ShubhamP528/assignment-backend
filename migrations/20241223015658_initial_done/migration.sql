/*
  Warnings:

  - You are about to drop the column `course_1` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `course_2` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "course_1",
DROP COLUMN "course_2";
