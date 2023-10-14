import { PrismaClient } from '@prisma/client';
import { main as mainZonasSugeridas } from './seeds_zonasSugeridas';


const prisma = new PrismaClient();

function getRandomItemFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

async function main() {
  // Apiarios
  const apiario1 = await prisma.apiario.create({
    data: {
      nombre: "Apiario 1",
      latitud: 40.7128,
      longitud: -74.006,
      direccion: "123 Calle Principal",
      tipo_ambiente: "RURAL",
    },
  });

  const apiario2 = await prisma.apiario.create({
    data: {
      nombre: "Apiario 2",
      latitud: 51.5074,
      longitud: -0.1278,
      direccion: "789 Calle Terciaria",
      tipo_ambiente: "URBANO",
    },
  });

  // Colmenas
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
      reina_color: "VERDE",
      reina_fecha_aceptacion: new Date(),
      reina_notas: "God save the Queen",
      foto1: "https://assets.dev-filo.dift.io/img/2020/02/28/queen_sq.jpg",
    },
  });

  // Alertas
  for (let i = 0; i < 3; i++) {
    await prisma.alerta.create({
      data: {
        descripcion: `Alerta para colmena 1 - ${i + 1}`,
        colmenaId: 1,
        terminada: false,
      },
    });
    await prisma.alerta.create({
      data: {
        descripcion: `Alerta para colmena 2 - ${i + 1}`,
        colmenaId: 2,
        terminada: false,
      },
    });
  }

  // Tareas
  // Tareas: Alimentación
  await prisma.$transaction(async (prisma) => {
    const tarea = await prisma.tarea.create({
      data: {
        fecha: new Date(),
        colmenaId: 1,
        tipoTarea: "ALIMENTACION",
      },
    });
    await prisma.tareaAlimentacion.create({
      data: {
        tareaId: tarea.id,
        alimento: "comida",
        cantidad: 50,
      },
    });
  });
  // Tareas: Tratamiento
  await prisma.$transaction(async (prisma) => {
    const tarea = await prisma.tarea.create({
      data: {
        fecha: new Date(),
        colmenaId: 1,
        tipoTarea: "TRATAMIENTO",
      },
    });

    await prisma.tareaTratamiento.create({
      data: {
        tareaId: tarea.id,
        tipoPlaga: "VARROA",
        producto: "Producto de tratamiento",
        dosis: "10 ml",
      },
    });
  });
  // Tareas: Cosecha
  await prisma.$transaction(async (prisma) => {
    const tarea = await prisma.tarea.create({
      data: {
        fecha: new Date(),
        colmenaId: 1,
        tipoTarea: "COSECHA",
      },
    });

    await prisma.tareaCosecha.create({
      data: {
        tareaId: tarea.id,
        tipoUnidad: "LIBRAS",
        cantidad: 20,
      },
    });
  });
  // Tareas: Varroa
  await prisma.$transaction(async (prisma) => {
    const tarea = await prisma.tarea.create({
      data: {
        fecha: new Date(),
        colmenaId: 1,
        tipoTarea: "VARROA",
      },
    });

    await prisma.tareaVarroa.create({
      data: {
        tareaId: tarea.id,
        tipoMetodo: "ALCOHOL",
        porcentaje: 5,
      },
    });
  });

  // Tareas: Cuadros
  await prisma.$transaction(async (prisma) => {
    const tarea = await prisma.tarea.create({
      data: {
        fecha: new Date(),
        colmenaId: 1,
        tipoTarea: "CAMBIO_DE_CUADROS",
      },
    });

    await prisma.tareaCuadros.create({
      data: {
        tareaId: tarea.id,
        cantidad: 8,
      },
    });
  });

  // Tareas: Hibernación
  await prisma.$transaction(async (prisma) => {
    const tarea = await prisma.tarea.create({
      data: {
        fecha: new Date(),
        colmenaId: 1,
        tipoTarea: "HIBERNACION",
      },
    });

    await prisma.tareaHibernacion.create({
      data: {
        tareaId: tarea.id,
      },
    });
  });

  // Tareas: Muerte
  await prisma.$transaction(async (prisma) => {
    const tarea = await prisma.tarea.create({
      data: {
        fecha: new Date(),
        colmenaId: 1,
        tipoTarea: "MUERTE",
      },
    });

    await prisma.tareaMuerte.create({
      data: {
        tareaId: tarea.id,
      },
    });
  });

  // Zonas sugeridas
  await mainZonasSugeridas();
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
