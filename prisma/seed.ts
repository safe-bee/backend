import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const apiario1 = await prisma.apiario.create({
    data: {
      name: 'Apiario 1',
      colmenas: {
        create: [
          { name: 'Colmena 1' },
          { name: 'Colmena 2' },
        ],
      },
    },
  });

  const apiario2 = await prisma.apiario.create({
    data: {
      name: 'Apiario 2',
      colmenas: {
        create: [
          { name: 'Colmena A' },
          { name: 'Colmena B' },
        ],
      },
    },
  });

  console.log({ apiario1, apiario2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
