import type { PrismaClient } from '@prisma/client/extension';
import type { Seeder } from '../seed';

export default class FakerSeeder implements Seeder {
  async main(prisma: PrismaClient) {
    const products = await prisma.product.findMany();
    const reviews = await prisma.review.findMany();

    for (const product of products) {
      product.reviewsCount = 0;
      product.rating = 0;
    }

    for (const product of products) {
      for (const review of reviews) {
        if (review.productId === product.id) {
          product.reviewsCount += 1;
          product.rating += review.rating;
        }
      }
    }

    for (const product of products) {
      if (product.reviewsCount === 0) {
        product.rating = 0;
      } else {
        product.rating = product.rating / product.reviewsCount;
      }
    }

    for (const product of products) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          rating: product.rating,
          reviewsCount: product.reviewsCount,
        },
      });
    }
  }
}