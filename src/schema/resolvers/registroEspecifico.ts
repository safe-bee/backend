function createRegistroResolver(tipoRegistro, nombrePrisma) {
    return async (parent, args, { prisma }) => {
      if (!args.colmenaId) {
        throw new Error(`${tipoRegistro}: colmenaId es necesario para crear una registro.`);
      }
  
      const { colmenaId, fecha, notas, ...restArgs } = args;
  
      const registro = await prisma.registro.create({
        data: {
          colmenaId: parseInt(colmenaId, 10), fecha, notas,
          tipoRegistro
        }
      });

      // Para 'HIBERNACION' y 'MUERTE', no creamos una registro específica
      if (tipoRegistro === "HIBERNACION" || tipoRegistro === "MUERTE") {
        return registro;
      }
  
      const registroEspecifico = await prisma[nombrePrisma].create({
        data: { registroId: registro.id, ...restArgs }
      });
  
      return registroEspecifico;
    };
  }
  
  function findRegistroResolver(tipoRegistro) {   

    return async (parent, args, { prisma }) => {

        if (tipoRegistro === "HIBERNACION" || tipoRegistro === "MUERTE") {
            return await prisma.registro.findUnique({ where: { id: parseInt(args.id, 10) }})}


      const registroEspecifico = await prisma[tipoRegistro].findUnique({
        where: { registroId: parseInt(args.id, 10) },
        include: { registro: true }
      });
      return registroEspecifico;
    };
  }
  
const registroEspecificoResolvers = {
    Query: {
      inspeccion: findRegistroResolver("inspeccion"),
      tratamiento: findRegistroResolver("RegistroTratamiento"),
      cosecha: findRegistroResolver("RegistroCosecha"),
      alimentacion: findRegistroResolver("RegistroAlimentacion"),
      cambio_de_cuadros: findRegistroResolver("RegistroCuadros"),
      varroa: findRegistroResolver("RegistroVarroa"),
      hibernacion: findRegistroResolver("HIBERNACION"),
      muerte: findRegistroResolver("MUERTE")
    },
    Mutation: {
      createInspeccion: createRegistroResolver("INSPECCION","inspeccion"),
      createTratamiento: createRegistroResolver("TRATAMIENTO","RegistroTratamiento"),
      createCosecha: createRegistroResolver("COSECHA","RegistroCosecha"),
      createAlimentacion: createRegistroResolver("ALIMENTACION","RegistroAlimentacion"),
      createCambioDeCuadros: createRegistroResolver("CAMBIO_DE_CUADROS","RegistroCuadros"),
      createVarroa: createRegistroResolver("VARROA","RegistroVarroa"),
      createHibernacion: createRegistroResolver("HIBERNACION",""),
      createMuerte: createRegistroResolver("MUERTE","")
    }
  };
  

  
  export default registroEspecificoResolvers;