/*
  Warnings:

  - A unique constraint covering the columns `[publicationTitle]` on the table `Publication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Publication_publicationTitle_key" ON "Publication"("publicationTitle");
