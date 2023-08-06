const apiarioResolvers = {
  Query: {
    apiarios: async (parent, args, { prisma }, info) => {
      const apiarios = await prisma.apiarios.findMany();
      return apiarios;
    },
  },
  Mutation: {
    addApiario: (root, args) => {
      const apiario = {...args}
      // Agregarlo a la base de datos
      return apiario
    }
  },
};

export default apiarioResolvers;
  