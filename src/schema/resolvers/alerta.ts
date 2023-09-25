const alertaResolvers = {
  Query: {
    alertas: async (parent, args, { prisma }) => {
      return await prisma.alerta.findMany();
    },
    alerta: async (parent, args, { prisma }) => {
      const { id } = args;
      return await prisma.alerta.findUnique({ where: { id } });
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