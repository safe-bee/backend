const apiariosResolvers = {
    Query: {
      apiarios: async (parent, args, { prisma }, info) => {
        const apiarios = await prisma.apiarios.findMany()
        return apiarios;
      },
    },
  };
  
  export default apiariosResolvers;
  