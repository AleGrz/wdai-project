import type { PrismaClient } from '@prisma/client/extension';
import type { Seeder } from '../seed';
import { randomInt } from 'crypto';
import * as fs from 'fs';

export default class FakerSeeder implements Seeder {
  async main(prisma: PrismaClient) {
    const reviews = JSON.parse(fs.readFileSync('./prisma/seeders/reviews.json', 'utf-8'));
    for (const review of reviews) {
        for (let i = 0; i <= randomInt(2, 5); i++) {
            const productId = randomInt(2406, 2822);
            await prisma.review.create({
                data: {
                    rating: review.rating,
                    description: review.description,
                    productId: productId,
                    userId: randomInt(1, 20),
                }
            });
            const reviewCount = (await prisma.product.findFirst({
                where: {
                    id: productId,
                },
                select: {
                    reviewsCount: true,
                }
            })).reviewsCount;
            const rating = (await prisma.product.findFirst({
                where: {
                    id: productId,
                },
                select: {
                    rating: true,
                }
            })).rating;
            await prisma.product.update({
                where: {
                    id: productId,
                },
                data: {
                    reviewsCount: {
                        increment: 1,
                    },
                    rating: (rating*reviewCount + review.rating)/(reviewCount + 1),
                }
        });
    }
  }
}}