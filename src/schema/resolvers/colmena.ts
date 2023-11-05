import { procesarInformacionParaTratamientoDeVarroa } from '../../xd';

const colmenaResolvers = {
  Query: {
    colmenas: async (parent, args, { prisma }) => {
      return await prisma.colmena.findMany({
        include: {
          apiario: true,
          registros: true,
          tareas: { where: { terminada: false } }
        }
      });
    },
    colmena: async (parent, args, { prisma }) => {
      const { id } = args;
      return await prisma.colmena.findUnique({
        where: { id }, include: {
          apiario: true,
          registros: true,
          tareas: { where: { terminada: false } }
        }
      });
    },
    procesarInformacionParaTratamientoDeVarroa: async (parent, args, { prisma }) => {
      const { colmenaId } = args;

      procesarInformacionParaTratamientoDeVarroa(prisma, colmenaId)

      return 1;
    },      
  },
  Mutation: {
    createColmena: async (parent, args, { prisma }) => {
      const newColmena = await prisma.colmena.create({ data: { ...args } });
      
      // Crear una tarea de inspección una vez que la colmena se crea
      await prisma.tarea.create({
        data: {
          descripcion: "Realizar tu primera Inspección",
          terminada: false,
          tipoRegistro: 'INSPECCION',
          colmena: {
            connect: {
              id: newColmena.id
            }
          }
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