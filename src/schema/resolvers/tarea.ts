import { sendNotification } from '../../notifications.js';

const tareaResolvers = {
  Query: {
    tareas: async (parent, args, { prisma }) => {
      return await prisma.tarea.findMany({ include: { registro: true } });
    },
    tarea: async (parent, args, { prisma }) => {
      const { id } = args;
      return prisma.tarea.findUnique({ where: { id }, include: { registro: true } });
    },      
    tareasPendientes: async (parent, args, { prisma }) => {
      return await prisma.tarea.findMany({
        where: {
          terminada: false
        },
        include: { registro: true }
      });
    },
    tareasPendientesPorColmenaYTipo: async (parent, args, { prisma }) => {
      const { colmenaId } = args;
      const { tipoRegistro } = args;
      return await prisma.tarea.findMany({
        where: {
          colmenaId: colmenaId,
          tipoRegistro: tipoRegistro,
          terminada: false,
        },
        include: { registro: true },
      });
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
    sendPushNotification: async (_, { token, mensaje }) => {
      try {
        await sendNotification(token, mensaje);
        return "Notification sent successfully";
      } catch (error) {
        console.error(error);
        return "Failed to send notification";
      }
    },
  },
};

export default tareaResolvers;