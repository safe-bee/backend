import { PrismaClient } from '@prisma/client';
import { main as mainZonasSugeridas } from './seeds_zonasSugeridas';
import {
  Clima,
  Sellado,
  Invasores,
  Estado,
  QueSeVe,
  PatronDeCria,
  DisponibilidadRecursos,
  Plagas,
  TemperamentoAbejas
} from "@prisma/client";


const prisma = new PrismaClient();

// Helpers
function getRandomItemFromEnum<T>(myEnum: T): keyof T {
  const array = Object.values(myEnum)
  return array[Math.floor(Math.random() * array.length)] as keyof T;
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export async function main() {
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
  await prisma.colmena.create({
    data: {
      nombre: "Colmena 1",
      apiarioId: apiario1.id,
      tipo: "LANGSTROTH",
    },
  });

  await prisma.colmena.create({
    data: {
      nombre: "Colmena 2",
      apiarioId: apiario1.id,
      tipo: "HORIZONTAL",
    },
  });

  await prisma.colmena.create({
    data: {
      nombre: "Colmena 3",
      apiarioId: apiario2.id,
      tipo: "TRADICIONAL",
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

  // Tareas
  for (let i = 0; i < 3; i++) {
    await prisma.tarea.create({
      data: {
        descripcion: `Tarea para colmena 1 - ${i + 1}`,
        colmenaId: 1,
        terminada: false,
        tipoRegistro: "ALIMENTACION",
      },
    });
    await prisma.tarea.create({
      data: {
        descripcion: `Tarea para colmena 2 - ${i + 1}`,
        colmenaId: 2,
        terminada: false,
        tipoRegistro: "COSECHA",
      },
    });
  }

  // Registros
  // Registros: Alimentación
  await prisma.$transaction(async (prisma) => {
    const registro = await prisma.registro.create({
      data: {
        fecha: new Date(2023, 8, 15),
        colmenaId: 1,
        tipoRegistro: "ALIMENTACION",
        tareaId: 1,
      },
    });
    await prisma.registroAlimentacion.create({
      data: {
        registroId: registro.id,
        alimento: "comida",
        cantidadAlimentacion: 50,
      },
    });
  });
  // Registros: Tratamiento
  await prisma.$transaction(async (prisma) => {
    const registro = await prisma.registro.create({
      data: {
        fecha: new Date(2023, 9, 10),
        colmenaId: 1,
        tipoRegistro: "TRATAMIENTO",
      },
    });

    await prisma.registroTratamiento.create({
      data: {
        registroId: registro.id,
        tipoPlaga: "VARROA",
        producto: "Producto de tratamiento",
        dosis: "10 ml",
      },
    });
  });
  // Registros: Cosecha
  await prisma.$transaction(async (prisma) => {
    const registro = await prisma.registro.create({
      data: {
        fecha: new Date(),
        colmenaId: 1,
        tipoRegistro: "COSECHA",
        tareaId: 2,
      },
    });

    await prisma.registroCosecha.create({
      data: {
        registroId: registro.id,
        tipoUnidad: "LIBRAS",
        cantidadCosecha: 20,
      },
    });
  });
  // Registros: Varroa
  await prisma.$transaction(async (prisma) => {
    const registro = await prisma.registro.create({
      data: {
        fecha: new Date(2023, 8, 11),
        colmenaId: 1,
        tipoRegistro: "VARROA",
      },
    });

    await prisma.registroVarroa.create({
      data: {
        registroId: registro.id,
        tipoMetodo: "ALCOHOL",
        porcentaje: 5,
      },
    });
  });

  // Registros: Cuadros
  await prisma.$transaction(async (prisma) => {
    const registro = await prisma.registro.create({
      data: {
        fecha: new Date(),
        colmenaId: 1,
        tipoRegistro: "CAMBIO_DE_CUADROS",
      },
    });

    await prisma.registroCuadros.create({
      data: {
        registroId: registro.id,
        cantidad: 8,
      },
    });
  });

  // Registros: Hibernación
  await prisma.$transaction(async (prisma) => {
    await prisma.registro.create({
      data: {
        fecha: new Date(2023, 9, 22),
        colmenaId: 1,
        tipoRegistro: "HIBERNACION",
      },
    });
  });

  // Registros: Muerte
  await prisma.$transaction(async (prisma) => {
    await prisma.registro.create({
      data: {
        fecha: new Date(2023, 10, 7),
        colmenaId: 1,
        tipoRegistro: "MUERTE",
      },
    });
  });

  // Registros: Inspección
  await prisma.$transaction(async (prisma) => {
    const fechaDeInspeccion = new Date("2023-01-01");
    for (let i = 0; i < 10; i++) {
      fechaDeInspeccion.setDate(fechaDeInspeccion.getDate() + (getRandomInt(7, 35)));
      const registro = await prisma.registro.create({
        data: {
          fecha: fechaDeInspeccion,
          colmenaId: 1,
          tipoRegistro: "INSPECCION",
        },
      });
      await prisma.inspeccion.create({
        data: {
          registroId: registro.id,
          clima: getRandomItemFromEnum(Clima),
          temperatura: getRandomInt(10, 30),
          estadoCajon: getRandomBoolean(),
          detalleCajonSellado: getRandomItemFromEnum(Sellado),
          detalleCajonInvasores: getRandomItemFromEnum(Invasores),
          estadoPoblacion: getRandomBoolean(),
          detallePoblacionEstado: getRandomItemFromEnum(Estado),
          detallePoblacionNumCuadros: getRandomInt(10, 100),
          detallePoblacionFaltaEspacio: getRandomBoolean(),
          estadoReinaLarvas: getRandomBoolean(),
          detalleReinaLarvasQueSeVe: getRandomItemFromEnum(QueSeVe),
          detalleReinaLarvasPatronDeCria: getRandomItemFromEnum(PatronDeCria),
          estadoFlora: getRandomBoolean(),
          detalleFloraEstado: getRandomItemFromEnum(Estado),
          detalleFloraDispRecursos: getRandomItemFromEnum(DisponibilidadRecursos),
          estadoAlimento: getRandomBoolean(),
          detalleAlimentoEstado: getRandomItemFromEnum(Estado),
          detalleAlimentoDispRecursos: getRandomItemFromEnum(DisponibilidadRecursos),
          estadoPlagas: getRandomBoolean(),
          detallePlagasPlagas: getRandomItemFromEnum(Plagas),
          detallePlagasTemperamentoAbejas: getRandomItemFromEnum(TemperamentoAbejas),
          fotoInspeccion: "https://previews.123rf.com/images/oticki/oticki1602/oticki160200005/51836460-la-inspecci%C3%B3n-de-colmena-de-abejas.jpg",
        },
      });
    }
  });

  // Marca las tareas que estan relacionadas a un registro como completadas.
  await prisma.tarea.updateMany({
    where: {
      registro: { isNot: null },
    },
    data: {
      terminada: true,
    },
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
