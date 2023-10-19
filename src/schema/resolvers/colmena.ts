const colmenaResolvers = {
  Query: {
    colmenas: async (parent, args, { prisma }) => {
      return await prisma.colmena.findMany({
        include: { apiario: true, alertas: true, tareas: true },
      });
    },
    colmena: async (parent, args, { prisma }) => {
      const { id } = args;
      return await prisma.colmena.findUnique({ where: { id }, include: { apiario: true, alertas: true, tareas: true } });
    },      
  },
  Mutation: {
    createColmena: async (parent, args, { prisma }) => {
      const newColmena = await prisma.colmena.create({ data: { ...args } });
      
      // Crear una alerta de inspección una vez que la colmena se crea
      await prisma.alerta.create({
        data: {
          descripcion: "Realizar Inspección",
          colmenaId: newColmena.id,
          terminada: false,
        }
      });
    
      return newColmena;
    },   
    updateColmena: async (parent, args, { prisma }) => {
      const { id, ...data } = args;
      return await prisma.colmena.update({ where: { id }, data });
    },
    deleteColmena: async (parent, args, { prisma }) => {
      const { id } = args;
      return await prisma.colmena.delete({ where: { id } });
    },
  },
};

export default colmenaResolvers;