const tareaResolvers = {
  DetallesTarea: {
    __resolveType(obj, context, info) {
      if (obj.tareaAlimentacion) {        
        return 'TareaAlimentacion';
      }
      if (obj.tareaTratamiento) {
        return 'TareaTratamiento';
      }
      if (obj.tareaCosecha) {
        return 'TareaCosecha';
      }
      if (obj.tareaVarroa) {
        return 'TareaVarroa';
      }
      if (obj.tareaCuadros) {
        return 'TareaCuadros';
      }
      if (obj.inspeccion) {
        return 'Inspeccion';
      }
      if (!obj || Object.keys(obj).length === 0) {
        return null; // O lanzar un error
      }
  }},

  Query: {
    tareas: async (parent, args, { prisma }) => {
      const { colmenaId, tipoTarea } = args;
      const tareas = await prisma.tarea.findMany({
        where: { colmenaId, tipoTarea },
        include: {
          colmena: true,
          alerta: true,
          inspeccion: true,
          tareaAlimentacion: true,
          tareaTratamiento: true,
          tareaCosecha: true,
          tareaVarroa: true,
          tareaCuadros: true,
        },
      });

      return tareas.map(tarea => {
        // Extrae solo los detalles que no son null
         const detalles = {          
           ...(tarea.inspeccion && { inspeccion: tarea.inspeccion }),
           ...(tarea.tareaAlimentacion && { tareaAlimentacion: tarea.tareaAlimentacion }),
           ...(tarea.tareaTratamiento && { tareaTratamiento: tarea.tareaTratamiento }),
           ...(tarea.tareaCosecha && { tareaCosecha: tarea.tareaCosecha }),
           ...(tarea.tareaVarroa && { tareaVarroa: tarea.tareaVarroa }),
           ...(tarea.tareaCuadros && { tareaCuadros: tarea.tareaCuadros }),
         };

        return {
          ...tarea,
          detalles: detalles,
        };
      });
    },
    tarea: async (parent, args, { prisma }) => {
      const { id } = args;
      return await prisma.tarea.findUnique({ where: { id }, include: {
        colmena: true,
        alerta: true,
        inspeccion: true,
        tareaAlimentacion: true,
        tareaTratamiento: true,
        tareaCosecha: true,
        tareaVarroa: true,
        tareaCuadros: true,
      }, });
    },      
  },
  Mutation: {
    createTarea: async (parent, args, { prisma }) => {
      return await prisma.tarea.create({ data: { ...args } });
    },    
    updateTarea: async (parent, args, { prisma }) => {
      const { id, ...data } = args;
      return await prisma.tarea.update({ where: { id }, data });
    },
    deleteTarea: async (parent, args, { prisma }) => {
      const { id } = args;
      return await prisma.tarea.delete({ where: { id } });
    },
  },
};

export default tareaResolvers;