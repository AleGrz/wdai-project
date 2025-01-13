import type { PrismaClient } from '@prisma/client/extension';
import type { Seeder } from '../seed';
import { faker } from '@faker-js/faker';

export default class FakerSeeder implements Seeder {
  async main(prisma: PrismaClient) {
    for (let i = 1; i <= 20; i++) {
      await prisma.user.create({
        data: {
          id: i,
          email: faker.internet.email(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            password: faker.internet.password(),
            isAdmin: false,
  }
});
    }
    await prisma.user.create({
      data: {
        id: 21,
        email: 'mateuszjarosz@agh.edu.pl',
        firstName: 'Mateusz',
        lastName: 'Jarosz',
        password: '$2b$10$/sy4N07DXK.xElx1hzHk4OgCK7ke/oBKEhWY7NPdwPlNiMALuHl.y',
        isAdmin: true,
    }});
    await prisma.user.create({
    data: {
      id: 22,
      email: 'alegrz@student.agh.edu.pl',
      firstName: 'Aleksander',
      lastName: 'Grzybek',
      password: '$2b$10$GU.dScGVMiS2ZoNtwqVsMOpVMftQDb76YU6jjnqQReUrGpGOL9uAG',
      isAdmin: false,

  }});
  await prisma.user.create({
    data: {
      id: 23,
      email: 'jjurczyk@student.agh.edu.pl',
      firstName: 'Jakub',
      lastName: 'Jurczyk',
      password: '$2b$10$GU.dScGVMiS2ZoNtwqVsMOpVMftQDb76YU6jjnqQReUrGpGOL9uAG',
      isAdmin: false,
}
});
}}