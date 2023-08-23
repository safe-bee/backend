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
    },
  });

  const colmena1 = await prisma.colmena.create({
    data: {
      nombre: "Colmena 1",
      apiarioId: apiario1.id,
      tipo: "LANGSTROTH",
    },
  });
  
  const colmena2 = await prisma.colmena.create({
    data: {
      nombre: "Colmena 2",
      apiarioId: apiario1.id,
      tipo: "HORIZONTAL",
    },
  });

  const colmena3 = await prisma.colmena.create({
    data: {
      nombre: "Colmena 3",
      apiarioId: apiario2.id,
      tipo: "TRADICIONAL",
      datos_numero_deeps: "2",
      datos_numero_supers: "3",
      datos_total_cuadros: "20",
      datos_color: "Amarillo",
      datos_origen: "NUCLEO",
      datos_fecha_establecimiento: new Date(),
      reina_tipo: "ITALIANA",
      reina_color: "Verde",
      reina_fecha_aceptacion: new Date(),
      reina_notas: "Good save the Queen",
      foto1:"https://assets.dev-filo.dift.io/img/2020/02/28/queen_sq.jpg"
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
