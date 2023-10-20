const alertaResolvers = {
  Query: {
    alertas: async (parent, args, { prisma }) => {
      const alertas = await prisma.alerta.findMany({ include: { tarea: true } });

      return alertas.map((alerta) => {
        return {
          ...alerta,
          tipo_alerta: alerta.tarea ? alerta.tarea.tipoTarea : null,
        };
      });

    },
    alerta: async (parent, args, { prisma }) => {
      const { id } = args;
      const alerta = await prisma.alerta.findUnique({ where: { id }, include: { tarea: true } });

      if (alerta) {
        return {
          ...alerta,
          tipo_alerta: alerta.tarea ? alerta.tarea.tipoTarea : null,
        };
      }

      return null;
    },      
  },
  Mutation: {
    createAlerta: async (parent, args, { prisma }) => {
      return await prisma.alerta.create({ data: { ...args } });
    },    
    updateAlerta: async (parent, args, { prisma }) => {
      const { id, ...data } = args;
      return await prisma.alerta.update({ where: { id }, data });
    },
    deleteAlerta: async (parent, args, { prisma }) => {
      const { id } = args;
      return await prisma.alerta.delete({ where: { id } });
    },
  },
};

export default alertaResolvers;