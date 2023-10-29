function createRegistroResolver(tipoRegistro: string, nombrePrisma: string) {
  return async (parent, args, { prisma }) => {
    if (!args.colmenaId) {
      throw new Error(
        `${tipoRegistro}: colmenaId es necesario para crear una registro.`
      );
    }

    const { colmenaId, tareaId, fecha, notas, ...restArgs } = args;

    const registro = await prisma.registro.create({
      data: {
        colmenaId: parseInt(colmenaId, 10),
        fecha,
        notas,
        tareaId,
        tipoRegistro,
      },
    });

    // Si recibo tareaId, voy a la tarea y la marco como terminada
    if (tareaId) {
      await prisma.tarea.update({
        where: { id: tareaId },
        data: { terminada: true },
      });
    }

    // Para 'HIBERNACION' y 'MUERTE', no creamos un registro específico
    if (tipoRegistro === "HIBERNACION" || tipoRegistro === "MUERTE") {
      return registro;
    }

    const registroEspecifico = await prisma[nombrePrisma].create({
      data: { registroId: registro.id, ...restArgs },
    });

    return registroEspecifico;
  };
}

function findRegistroResolver(tipoRegistro: string) {
  return async (parent, args, { prisma }) => {
    if (tipoRegistro === "HIBERNACION" || tipoRegistro === "MUERTE") {
      return await prisma.registro.findUnique({
        where: { id: parseInt(args.id, 10) },
      });
    }

    const registroEspecifico = await prisma[tipoRegistro].findUnique({
      where: { registroId: parseInt(args.id, 10) },
      include: { registro: true },
    });
    return registroEspecifico;
  };
}

// function modifyRegistroResolver(tipoRegistro: string, nombrePrisma: string) {
//   return async (parent, { registroId, ...args }, { prisma }) => {
//     if (!registroId) {throw new Error(`${tipoRegistro}: id es necesario para modificar un registro.`);}

//     registroId = parseInt(registroId, 10)

//     // Actualiza el registro específico
//     const registroEspecifico = await prisma[nombrePrisma].update({
//       where: { registroId },
//       data: { ...args }
//     });

//     return registroEspecifico;
//   };
// }


const registroEspecificoResolvers = {
  Query: {
    inspeccion: findRegistroResolver("inspeccion"),
    tratamiento: findRegistroResolver("RegistroTratamiento"),
    cosecha: findRegistroResolver("RegistroCosecha"),
    alimentacion: findRegistroResolver("RegistroAlimentacion"),
    cambio_de_cuadros: findRegistroResolver("RegistroCuadros"),
    varroa: findRegistroResolver("RegistroVarroa"),
    hibernacion: findRegistroResolver("HIBERNACION"),
    muerte: findRegistroResolver("MUERTE"),
  },
  Mutation: {
    createInspeccion: createRegistroResolver("INSPECCION", "inspeccion"),
    createTratamiento: createRegistroResolver("TRATAMIENTO","RegistroTratamiento"),
    createCosecha: createRegistroResolver("COSECHA", "RegistroCosecha"),
    createAlimentacion: createRegistroResolver("ALIMENTACION","RegistroAlimentacion"),
    createCambioDeCuadros: createRegistroResolver("CAMBIO_DE_CUADROS","RegistroCuadros"),
    createVarroa: createRegistroResolver("VARROA", "RegistroVarroa"),
    createHibernacion: createRegistroResolver("HIBERNACION", ""),
    createMuerte: createRegistroResolver("MUERTE", ""),
    // modifyInspeccion: modifyRegistroResolver("INSPECCION", "inspeccion"),
  },
};

export default registroEspecificoResolvers;
