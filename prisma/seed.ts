import { PrismaClient } from "@prisma/client";
import { main as mainZonasSugeridas } from "./seeds_zonasSugeridas";
import bcrypt from "bcryptjs";
import { fakerES as faker } from "@faker-js/faker";
import {
  Clima,
  Sellado,
  Invasores,
  Estado,
  QueSeVe,
  PatronDeCria,
  DisponibilidadRecursos,
  Plagas,
  TemperamentoAbejas,
  TipoAmbiente,
  TipoColmena,
  OrigenColmena,
  TipoReina,
  ColorReina,
  TipoRegistro
} from "@prisma/client";

const prisma = new PrismaClient();

faker.seed(1234);

// Helpers

/**
 * Función con distribución normal para obtener una cantidad de 
 * cuadros que tenga sentido según el día del año
 */ 
function diaACantidadDeCuadros(x) {
  if (x > 185) {
    x = x - 365;
  }
  const pi = Math.PI;
  const e = Math.E;
  const cantidadDeCuadros = 2.5 + 25 * (1 / Math.sqrt(2 * pi)) * Math.pow(e, x ** 2 / -5000);
  return cantidadDeCuadros;
}

function diaDelAnio(date){
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}


export async function main() {
  const passwordFederico = await bcrypt.hash("federico123", 10);
  const passwordJose = await bcrypt.hash("jose123", 10);
  const passwordAntonio = await bcrypt.hash("antonio123", 10);

  const federico = await prisma.usuario.create({
    data: {
      nombreUsuario: "Federico",
      correoElectronico: "federico@example.com",
      contrasenaHash: passwordFederico,
    },
  });

  const jose = await prisma.usuario.create({
    data: {
      nombreUsuario: "Jose",
      correoElectronico: "jose@example.com",
      contrasenaHash: passwordJose,
    },
  });

  const antonio = await prisma.usuario.create({
    data: {
      nombreUsuario: "Antonio",
      correoElectronico: "antonio@example.com",
      contrasenaHash: passwordAntonio,
    },
  });

  const usuarios = [federico, jose, antonio];

  // Apiarios
  const apiarios = [];
  usuarios.forEach((usuario) => {
    for (let i = 0; i < 4; i++) {
      const nuevoApiario = {
        nombre: "Apiario " + faker.animal.bird(),
        latitud: -38 + faker.number.float({ max: 10.5, precision: 0.0001 }),
        longitud: -68 + faker.number.float({ max: 9, precision: 0.0001 }),
        direccion: faker.location.streetAddress(),
        tipo_ambiente: faker.helpers.enumValue(TipoAmbiente),
        usuarioId: usuario.usuarioId,
      };

      apiarios.push(nuevoApiario);
    }
  });

  process.stdout.write(`\rCreo Apiarios`);
  await Promise.all(
    apiarios.map(async (apiario) =>
      prisma.apiario.create({
        data: apiario,
      })
    )
  );
  console.log(`\rCreo Apiarios ✅`);

  // Colmenas
  const colmenas = [];
  const apiariosIds = await prisma.apiario.findMany({ select: { id: true } });

  apiariosIds.forEach((apiario) => {
    for (let i = 0; i < 4; i++) {
      const nuevaColmena = {
        nombre: "Colmena " + faker.person.middleName(),
        apiarioId: apiario.id,
        tipo: faker.helpers.enumValue(TipoColmena),
        datos_total_cuadros: "20",
        datos_color: faker.helpers.enumValue(ColorReina),
        datos_origen: faker.helpers.enumValue(OrigenColmena),
        datos_fecha_establecimiento: new Date(),
        reina_tipo: faker.helpers.enumValue(TipoReina),
        reina_color: faker.helpers.enumValue(ColorReina),
        reina_fecha_aceptacion: new Date(),
        reina_notas: "God save the Queen",
        foto1: "https://assets.dev-filo.dift.io/img/2020/02/28/queen_sq.jpg",
      };

      colmenas.push(nuevaColmena);
    }
  });

  process.stdout.write(`\rCreo Colmenas`);
  await Promise.all(
    colmenas.map(async (colmena) =>
      prisma.colmena.create({
        data: colmena,
      })
    )
  );
  console.log(`\rCreo Colmenas ✅`);

  // Tareas
  const tareas = [];
  const colemnasIds = await prisma.colmena.findMany({ select: { id: true } });
  colemnasIds.forEach((colmena) => {
    for (let i = 0; i < 3; i++) {
      const nuevaTarea = {
        descripcion: faker.animal.cow(),
        colmenaId: colmena.id,
        terminada: false,
        tipoRegistro: faker.helpers.enumValue(TipoRegistro),
      };
      tareas.push(nuevaTarea);
    }
  });

  process.stdout.write(`\rCreo Tareas`);
  await Promise.all(
    tareas.map(async (tarea) =>
      prisma.tarea.create({
        data: tarea,
      })
    )
  );
  console.log(`\rCreo Tareas ✅`);

  // Registros
  // Registros: Alimentación
  process.stdout.write(`\rCreo Registros`);
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
  const fechaInicial = Date.parse("2018-11-23T03:38:51.000Z");
  // fechaInicial.setFullYear(fechaInicial.getFullYear() - 5);

  const fechaDeInspeccion = new Date(fechaInicial);

  while (fechaDeInspeccion <= new Date()) {
    await prisma.$transaction(async (prisma) => {
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
          clima: faker.helpers.enumValue(Clima),
          temperatura: faker.number.int({ min: 10, max: 30 }),
          estadoCajon: faker.datatype.boolean(),
          detalleCajonSellado: faker.helpers.enumValue(Sellado),
          detalleCajonInvasores: faker.helpers.enumValue(Invasores),
          estadoPoblacion: faker.datatype.boolean(),
          detallePoblacionEstado: faker.helpers.enumValue(Estado),
          detallePoblacionNumCuadros: diaACantidadDeCuadros(diaDelAnio(fechaDeInspeccion)) + faker.number.float({ min: -0.5, max: 1 }),
          detallePoblacionFaltaEspacio: faker.datatype.boolean(),
          estadoReinaLarvas: faker.datatype.boolean(),
          detalleReinaLarvasQueSeVe: faker.helpers.enumValue(QueSeVe),
          detalleReinaLarvasPatronDeCria: faker.helpers.enumValue(PatronDeCria),
          estadoFlora: faker.datatype.boolean(),
          detalleFloraEstado: faker.helpers.enumValue(Estado),
          detalleFloraDispRecursos: faker.helpers.enumValue(DisponibilidadRecursos),
          estadoAlimento: faker.datatype.boolean(),
          detalleAlimentoEstado: faker.helpers.enumValue(Estado),
          detalleAlimentoDispRecursos: faker.helpers.enumValue(DisponibilidadRecursos),
          estadoPlagas: faker.datatype.boolean(),
          detallePlagasPlagas: faker.helpers.enumValue(Plagas),
          detallePlagasTemperamentoAbejas:
            faker.helpers.enumValue(TemperamentoAbejas),
          fotoInspeccion:
            "https://previews.123rf.com/images/oticki/oticki1602/oticki160200005/51836460-la-inspecci%C3%B3n-de-colmena-de-abejas.jpg",
        },
      });
    });

    fechaDeInspeccion.setDate(fechaDeInspeccion.getDate() + 15);
  }
  console.log(`\rCreo Registros ✅`);

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
