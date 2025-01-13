import type { PrismaClient } from '@prisma/client/extension';
import type { Seeder } from '../seed';
import { randomInt } from 'crypto';
import * as fs from 'fs';

export default class FakerSeeder implements Seeder {
  async main(prisma: PrismaClient) {
    const products = JSON.parse(fs.readFileSync('./prisma/seeders/products.json', 'utf-8'));
    const reviews = JSON.parse(fs.readFileSync('./prisma/seeders/reviews.json', 'utf-8'));
    for (const review of reviews) {
        for (let i = 0; i <= randomInt(2, 5); i++) {
            await prisma.rating.create({
                data: {
                    rating: review.rating,
                    review: review.review,
                    productId: products[randomInt(0, products.length - 1)].id,
                    userId: randomInt(1, 20),
                }
            });
        }
    }
  }
}