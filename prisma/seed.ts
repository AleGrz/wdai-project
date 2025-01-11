import * as fs from 'fs';
import * as path from 'path';
import { parseArgs } from 'node:util';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export interface Seeder {
  main(prismaClient: PrismaClient): Promise<void>;
}

async function main() {
  console.log('Seeding database...'); 
  const { values } = parseArgs({
    options: {
      filename: {
        type: 'string'
      },
    },
  });

  const seedersPath = path.join(__dirname, 'seeders');
  const sqlSeedFiles = fs.readdirSync(seedersPath).filter(file => file.endsWith('.sql'));
  const tsSeedFiles = fs.readdirSync(seedersPath).filter(file => file.endsWith('.ts'));

  if (values.filename) {
    if (sqlSeedFiles.includes(values.filename)) {
      console.log('Executing SQL seed file: ', values.filename , '...'); 
      const filePath = path.join(seedersPath, values.filename);
      const sql = fs.readFileSync(filePath, 'utf-8');

      await prisma.$executeRawUnsafe(sql);
      console.log('SQL file ' + values.filename + ' executed successfully!'); 
    } else if (tsSeedFiles.includes(values.filename)) {
      console.log('Executing TypeScript seed file: ' + values.filename + '...'); 
      const filePath = path.join(seedersPath, values.filename);
      const mod = await import(filePath);
      const SeederClass = mod.default as { new (): Seeder };
      const seederInstance = new SeederClass();

      await seederInstance.main(prisma);
      console.log('TypeScript file ' + values.filename + ' executed successfully!'); 
    } else {
      console.log('No seed file found with the name: ' + values.filename);
    }

    return;
  }

  if (!sqlSeedFiles.length) {
    console.log('No SQL seed files found!');
  }

  for (const file of sqlSeedFiles) {
    console.log('Executing SQL seed file: ', file , '...'); 
    const filePath = path.join(seedersPath, file);
    const sql = fs.readFileSync(filePath, 'utf-8');

    await prisma.$executeRawUnsafe(sql);
    console.log('SQL file ' + file + ' executed successfully!'); 
  }

  if (!tsSeedFiles.length) {
    console.log('No TypeScript seed files found!');
  }

  for (const file of tsSeedFiles) {
    console.log('Executing TypeScript seed file: ' + file + '...'); 
    const filePath = path.join(seedersPath, file);
    const mod = await import(filePath);
    const SeederClass = mod.default as { new (): Seeder };
    const seederInstance = new SeederClass();

    await seederInstance.main(prisma);
    console.log('TypeScript file ' + file + ' executed successfully!'); 
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })