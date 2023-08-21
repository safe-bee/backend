import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const apiario1 = await prisma.apiario.create({
    data: {
      nombre: "Apiario 1",
      latitud: 40.7128,
      longitud: -74.006,
      direccion: "123 Calle Principal",
      tipo_terreno: "CAMPO",
      tipo_ambiente: "RURAL",
      colmenas: {
        create: [{ name: "Colmena 1" }, { name: "Colmena 2" }],
      },
    },
  });

  const apiario2 = await prisma.apiario.create({
    data: {
      nombre: "Apiario 2",
      latitud: 51.5074,
      longitud: -0.1278,
      direccion: "789 Calle Terciaria",
      tipo_terreno: "COSTA",
      tipo_ambiente: "URBANO",
      colmenas: {
        create: [{ name: "Colmena A" }, { name: "Colmena B" }],
      },
    },
  });

  // console.log({ apiario1, apiario2 });
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
