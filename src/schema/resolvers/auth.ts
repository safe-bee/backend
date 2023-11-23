import bcryptjs from 'bcryptjs';

const authResolvers = {
  Query: {
    obtenerDatosUsuario: async (_parent, args, context) => {
      return await context.prisma.usuario.findUnique({
        where: { nombreUsuario: args.nombreUsuario },
        select: {
          nombreUsuario: true,
          correoElectronico: true,
          fechaCreacion: true,
          // Incluye aquí otros campos que desees devolver
        }
      });
    },
  },

  Mutation: {
    signUp: async (_parent, args, context) => {
      const { nombreUsuario, correoElectronico, contrasena } = args;

      // '10' es el número de rondas de salting, lo que afecta la seguridad del hash
      const contrasenaHash = await bcryptjs.hash(contrasena, 10); 

      const usuario = await context.prisma.usuario.create({
        data: {
          nombreUsuario,
          correoElectronico,
          contrasenaHash,
        },
      });

      return { usuario };
    },
    signIn: async (_parent, args, context) => {
      const { nombreUsuario, contrasena } = args;
      const usuario = await context.prisma.usuario.findUnique({
        where: { nombreUsuario },
      });

      // Verificación de si el usuario existe y si la contraseña es correcta
      if (!usuario) {
        throw new Error('Usuario Inexistente');
      }

      if (!await bcryptjs.compare(contrasena, usuario.contrasenaHash)) {
        throw new Error('Credenciales incorrectas');
      }
      
      // Si todo es correcto, retornamos el usuario
      return { usuario };
    },
    suscribeToPushNotification: async (_, { usuarioId, token }, { prisma }) => {
      try {
        const usuarioActualizado = await prisma.usuario.update({
          where: { usuarioId },
          data: { token },
        });

        return { usuario: usuarioActualizado };
      } catch (error) {
        // Manejar errores (usuario no encontrado, error de base de datos, etc.)
        throw new Error("Error al actualizar el token del usuario.");
      }
    },
  },
};

export default authResolvers;
