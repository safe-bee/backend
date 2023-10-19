function createTareaResolver(tipoTarea, nombrePrisma) {
    return async (parent, args, { prisma }) => {
      if (!args.colmenaId) {
        throw new Error(`${tipoTarea}: colmenaId es necesario para crear una tarea.`);
      }
  
      const { colmenaId, ...restArgs } = args;
  
      const tarea = await prisma.tarea.create({
        data: {
          colmenaId: parseInt(colmenaId, 10),
          tipoTarea
        }
      });

      // Para 'HIBERNACION' y 'MUERTE', no creamos una tarea específica
      if (tipoTarea === "HIBERNACION" || tipoTarea === "MUERTE") {
        return { tareaId: tarea.id };
      }
  
      const tareaEspecifica = await prisma[nombrePrisma].create({
        data: { tareaId: tarea.id, ...restArgs }
      });
  
      return tareaEspecifica;
    };
  }
  
  function findTareaResolver(tipoTarea) {   

    return async (parent, args, { prisma }) => {

        if (tipoTarea === "HIBERNACION" || tipoTarea === "MUERTE") {
            return await prisma.tarea.findUnique({ where: { id: args.id }})}


      const tareaEspecifica = await prisma[tipoTarea].findUnique({
        where: { tareaId: parseInt(args.id, 10) },
        include: { tarea: true }
      });
      return tareaEspecifica;
    };
  }
  
const tareaEspecificaResolvers = {
    Query: {
      inspeccion: findTareaResolver("inspeccion"),
      tratamiento: findTareaResolver("TareaTratamiento"),
      cosecha: findTareaResolver("TareaCosecha"),
      alimentacion: findTareaResolver("TareaAlimentacion"),
      cambio_de_cuadros: findTareaResolver("TareaCuadros"),
      varroa: findTareaResolver("TareaVarroa"),
      hibernacion: findTareaResolver("HIBERNACION"),
      muerte: findTareaResolver("MUERTE")
    },
    Mutation: {
      createInspeccion: createTareaResolver("INSPECCION","inspeccion"),
      createTratamiento: createTareaResolver("TRATAMIENTO","TareaTratamiento"),
      createCosecha: createTareaResolver("COSECHA","TareaCosecha"),
      createAlimentacion: createTareaResolver("ALIMENTACION","TareaAlimentacion"),
      createCambioDeCuadros: createTareaResolver("CAMBIO_DE_CUADROS","TareaCuadros"),
      createVarroa: createTareaResolver("VARROA","TareaVarroa"),
      createHibernacion: createTareaResolver("HIBERNACION",""),
      createMuerte: createTareaResolver("MUERTE","")
    }
  };
  

  
  export default tareaEspecificaResolvers;