const apiarioResolvers = {
  Query: {
    apiarios: async (parent, args, { prisma }) => {
      return await prisma.apiario.findMany({ include: { colmenas:{} } });
    },
    apiario: async (parent, args, { prisma }) => {
      const { id } = args
      return await prisma.apiario.findUnique({ where: { id }, include: { colmenas:{} }});
    },
      
  },
  Mutation: {
    createApiario: async (parent, args, { prisma }) => {
      const { nombre, latitud, longitud, direccion, tipo_ambiente, fecha_creacion } = args
      return await prisma.apiario.create({ data: { nombre, latitud, longitud, direccion, tipo_ambiente, fecha_creacion } });
    },
    updateApiario: async (parent, args, { prisma }) => {
      const { id, nombre, latitud, longitud, direccion, tipo_ambiente, fecha_creacion } = args
      return await prisma.apiario.update({ where: { id }, data: { nombre, latitud, longitud, direccion, tipo_ambiente, fecha_creacion } });
    },
    deleteApiario: async (parent, args, { prisma }) => {
      const { id } = args;
      await prisma.colmena.deleteMany({ where: { apiarioId: id } });
      return await prisma.apiario.delete({ where: { id } });
    },
  },
};

export default apiarioResolvers;