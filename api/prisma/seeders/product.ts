import type { PrismaClient } from '@prisma/client/extension';
import type { Seeder } from '../seed';

import * as fs from 'fs';

export default class FakerSeeder implements Seeder {
  async main(prisma: PrismaClient) {
    const products = JSON.parse(fs.readFileSync('./prisma/seeders/products.json', 'utf-8'));

    for (const product of products) {
      await prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          brand: product.brand,
          description: product.description,
          price: product.price,
          inStock: product.inStock,
          categoryId: product.categoryId-2710,
          imageUrl: product.imageUrl,
        },
      });
    }
  }
}