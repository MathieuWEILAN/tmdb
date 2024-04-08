-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ToWatch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idItem" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "date_release" TEXT,
    CONSTRAINT "ToWatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ToWatch" ("date_release", "id", "idItem", "poster_path", "title", "type", "userId") SELECT "date_release", "id", "idItem", "poster_path", "title", "type", "userId" FROM "ToWatch";
DROP TABLE "ToWatch";
ALTER TABLE "new_ToWatch" RENAME TO "ToWatch";
CREATE TABLE "new_Favorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idItem" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "date_release" TEXT,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Favorite" ("date_release", "id", "idItem", "poster_path", "title", "type", "userId") SELECT "date_release", "id", "idItem", "poster_path", "title", "type", "userId" FROM "Favorite";
DROP TABLE "Favorite";
ALTER TABLE "new_Favorite" RENAME TO "Favorite";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
