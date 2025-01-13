import type { PrismaClient } from '@prisma/client/extension';
import type { Seeder } from '../seed';
import { faker } from '@faker-js/faker';

export default class FakerSeeder implements Seeder {
  async main(prisma: PrismaClient) {
    for (let i = 1; i <= 20; i++) {
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            password: faker.internet.password(),
            isAdmin: false,
  }
});
    }
    }
}