import bcrypt from 'bcrypt';

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
      const contrasenaHash = await bcrypt.hash(contrasena, 10); 

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

      if (!await bcrypt.compare(contrasena, usuario.contrasenaHash)) {
        throw new Error('Credenciales incorrectas');
      }
      
      // Si todo es correcto, retornamos el usuario
      return { usuario };
    },
  },
};

export default authResolvers;
