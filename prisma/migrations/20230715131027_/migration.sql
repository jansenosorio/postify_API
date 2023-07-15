-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "userEmail" VARCHAR(100) NOT NULL,
    "userPassword" VARCHAR(20) NOT NULL,
    "userAvatar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Publication" (
    "publicationId" SERIAL NOT NULL,
    "publicationImage" TEXT NOT NULL,
    "publicationTitle" VARCHAR(80) NOT NULL,
    "publicationText" TEXT NOT NULL,
    "dateToPublished" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "socialMedia" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("publicationId")
);

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
