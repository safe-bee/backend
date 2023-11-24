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
      createTarea:  async (parent, args, { prisma }) => {
      // Crear la tarea
      const tarea = await prisma.tarea.create({ data: { ...args } });
    
      // Verificar si la fecha de la tarea es hoy
      const hoy = new Date();
      // console.log(`Date: ${tarea.fecha}, Hoy: ${hoy}`);

      if (tarea.fecha && tarea.fecha.toDateString() === hoy.toDateString()) {
        // Obtener información de la colmena
        const colmena = await prisma.colmena.findUnique({
          where: { id: tarea.colmenaId },
          include: { apiario: true }
        });
    
        if (colmena && colmena.apiario) {
          // Obtener el usuario y su token
          const usuario = await prisma.usuario.findUnique({
            where: { usuarioId: colmena.apiario.usuarioId }
          });
    
          if (usuario && usuario.token) {
            // Mensaje de la notificación
            const tipoRegistroFormato = tarea.tipoRegistro.toLowerCase().replace(/_/g, ' ');

            const mensaje = `Hoy tienes una tarea de ${tipoRegistroFormato} en colmena ${colmena.nombre}`;
    
            // Enviar notificación
            await sendNotification(usuario.token, mensaje);
    
            // Opcional: Mostrar mensaje y ID de usuario en la terminal
            console.log(`Mensaje enviado: ${mensaje} a Usuario: ${usuario.nombreUsuario}`);
          }
          else {
            console.log(`Token not found for user ID: ${usuario.usuarioId}`);
          }
        }
      }
    
      return tarea;
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