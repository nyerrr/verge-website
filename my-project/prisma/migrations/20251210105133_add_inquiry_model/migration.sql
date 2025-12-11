/*
  Warnings:

  - Added the required column `image` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "propertyTitle" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "bedrooms" TEXT NOT NULL,
    "bathrooms" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "floorLevel" TEXT,
    "parking" TEXT,
    "yearBuilt" TEXT,
    "propertyId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "createdBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Property" ("area", "bathrooms", "bedrooms", "category", "createdAt", "description", "features", "floorLevel", "id", "images", "location", "parking", "price", "propertyId", "status", "title", "type", "updatedAt", "yearBuilt") SELECT "area", "bathrooms", "bedrooms", "category", "createdAt", "description", "features", "floorLevel", "id", "images", "location", "parking", "price", "propertyId", "status", "title", "type", "updatedAt", "yearBuilt" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
CREATE UNIQUE INDEX "Property_propertyId_key" ON "Property"("propertyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
