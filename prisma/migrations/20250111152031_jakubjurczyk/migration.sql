/*
  Warnings:

  - You are about to drop the column `isSold` on the `OrderDetail` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "OrderDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderDetail" ("id", "orderId", "productId") SELECT "id", "orderId", "productId" FROM "OrderDetail";
DROP TABLE "OrderDetail";
ALTER TABLE "new_OrderDetail" RENAME TO "OrderDetail";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
