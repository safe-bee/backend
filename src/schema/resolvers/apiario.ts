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
      const { usuarioId, nombre, latitud, longitud, direccion, tipo_ambiente, fecha_creacion } = args;

      // Verificar si ya existe un apiario con el mismo nombre para el mismo usuario
      const apiarioExistente = await prisma.apiario.findFirst({where: { nombre, usuarioId } });      

      if (apiarioExistente) {
        throw new Error('Ya existe un apiario con este nombre para el usuario.');
      }
      // Crear el nuevo apiario si no hay conflictos
      return await prisma.apiario.create({ data: { 
        usuario: { connect: { usuarioId } }, nombre, latitud, longitud, direccion, tipo_ambiente, fecha_creacion 
      } });
    },
    updateApiario: async (parent, args, { prisma }) => {
      const { id, nombre, latitud, longitud, direccion, tipo_ambiente, fecha_creacion } = args

      // Obtener el usuarioId del apiario actual
      const apiarioActual = await prisma.apiario.findUnique({ where: { id } });
      const usuarioId = apiarioActual.usuarioId;

      // Verificar si ya existe otro apiario con el mismo nombre para el mismo usuario
      const apiarioExistente = await prisma.apiario.findFirst({
        where: { nombre, usuarioId, id: { not: id } } });

      if (apiarioExistente) {
        throw new Error('Ya existe otro apiario con este nombre para el usuario.');
      }

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