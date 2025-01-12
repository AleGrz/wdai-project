/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userId` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `OrderDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `OrderDetail` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `orderId` on the `OrderDetail` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userId` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "orderDate" DATETIME,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "orderDate", "userId") SELECT "id", "orderDate", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_OrderDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "isSold" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "OrderDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderDetail" ("id", "isSold", "orderId", "productId") SELECT "id", "isSold", "orderId", "productId" FROM "OrderDetail";
DROP TABLE "OrderDetail";
ALTER TABLE "new_OrderDetail" RENAME TO "OrderDetail";
CREATE TABLE "new_Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("description", "id", "productId", "rating", "userId") SELECT "description", "id", "productId", "rating", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("email", "firstName", "id", "isAdmin", "lastName", "password") SELECT "email", "firstName", "id", "isAdmin", "lastName", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
