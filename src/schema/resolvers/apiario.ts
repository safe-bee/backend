const apiarioResolvers = {
  Query: {
    apiarios: async (parent, args, { prisma }, info) => {
      return await prisma.apiario.findMany();
    },
    apiario: async (parent, args, { prisma }, info) => {
      const { id } = args
      return await prisma.apiario.findUnique({ where: { id }});
    },
      
  },
  Mutation: {
    createApiario: async (parent, args, { prisma }, info) => {
      const { name } = args
      return await prisma.apiario.create({ data: { name } });
    },
    updateApiario: async (parent, args, { prisma }, info) => {
      const { id, name } = args
      return await prisma.apiario.update({ where: { id }, data: { name } });
    },
    deleteApiario: async (parent, args, { prisma }, info) => {
      const { id } = args
      return await prisma.apiario.delete({ where: { id } });
    },
  },
};

export default apiarioResolvers;