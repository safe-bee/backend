const tareaResolvers = {
  Query: {
    tareas: async (parent, args, { prisma }) => {
      return await prisma.tarea.findMany({
        include: { colmena: true, alerta: true },
      });
    },
    tarea: async (parent, args, { prisma }) => {
      const { id } = args;
      return await prisma.tarea.findUnique({ where: { id }, include: { colmena: true, alerta: true } });
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