import { procesarInformacionParaTratamientoDeVarroa, estaEnSudoesteBuenosAires } from '../../xd.js';

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
      const { nombre, apiarioId } = args;
      // Verificar si ya existe una colmena con el mismo nombre en el apiario
      const colmenaExistente = await prisma.colmena.findFirst({
        where: {
          nombre,
          apiarioId
        }
      });

      if (colmenaExistente) {
        throw new Error('Ya existe una colmena con este nombre en el apiario.');
      }


      const newColmena = await prisma.colmena.create({
        data: { ...args },
        include: { apiario: true },
      });
      
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

      if (estaEnSudoesteBuenosAires(newColmena.apiario.latitud, newColmena.apiario.longitud)) {
        const fechaActual = new Date();
        const fechaDeseada = new Date(fechaActual.getFullYear(), 8, 21); // proximo 21/09
        const proximo21DeSeptiembre = fechaDeseada <= fechaActual ? new Date(fechaActual.getFullYear() + 1, 8, 21) : fechaDeseada;

        await prisma.tarea.create({
          data: {
            descripcion: "Tarea generada automáticamente debido a la curva de Varroa en la zona",
            terminada: false,
            tipoRegistro: 'VARROA',
            colmenaId: newColmena.id,
            fecha: proximo21DeSeptiembre
          }
        });
      }
      
      return newColmena;
    },
 
    updateColmena: async (parent, args, { prisma }) => {
      const { id, nombre, apiarioId, ...otrosDatos } = args;

      // Verificar si ya existe otra colmena con el mismo nombre en el apiario
      const colmenaExistente = await prisma.colmena.findFirst({
        where: { nombre, apiarioId, id: { not: id } } });          

      if (colmenaExistente) {
        throw new Error('Ya existe otra colmena con este nombre en el apiario.');
      }

      return await prisma.colmena.update({
        where: { id },
        data: { nombre, apiarioId, ...otrosDatos }
      });
  },
    deleteColmena: async (parent, args, { prisma }) => {
      const { id } = args;
      return await prisma.colmena.delete({ where: { id } });
    },
  },
};

export default colmenaResolvers;