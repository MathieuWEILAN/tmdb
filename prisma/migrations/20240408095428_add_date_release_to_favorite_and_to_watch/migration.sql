-- CreateTable
CREATE TABLE "Favorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idItem" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "date_release" TEXT NOT NULL,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ToWatch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idItem" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "date_release" TEXT NOT NULL,
    CONSTRAINT "ToWatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
