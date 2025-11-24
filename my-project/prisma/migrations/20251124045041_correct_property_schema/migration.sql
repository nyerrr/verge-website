/*
  Warnings:

  - The primary key for the `Property` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Property" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "location" TEXT,
    "category" TEXT,
    "type" TEXT,
    "status" TEXT,
    "bedrooms" TEXT,
    "bathrooms" TEXT,
    "area" TEXT,
    "floorLevel" TEXT,
    "parking" TEXT,
    "yearBuilt" TEXT,
    "propertyId" TEXT,
    "image" TEXT,
    "images" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Property" ("area", "bathrooms", "bedrooms", "category", "createdAt", "createdBy", "description", "features", "floorLevel", "id", "images", "location", "parking", "price", "propertyId", "status", "title", "type", "updatedAt", "yearBuilt") SELECT "area", "bathrooms", "bedrooms", "category", "createdAt", "createdBy", "description", "features", "floorLevel", "id", "images", "location", "parking", "price", "propertyId", "status", "title", "type", "updatedAt", "yearBuilt" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
