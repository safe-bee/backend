const zonaSugeridaResolvers = {
    Query: {
      zonasSugeridas: async (_, __, { prisma }) => {
        const zonas = await prisma.zona.findMany({
          include: {
            coordenadas: true,
          },
        });
  
        return zonas.map((zona) => ({
          nombre: zona.nombre,
          coordenadas: zona.coordenadas.map((coord) => ({
            coord1: coord.coord1,
            coord2: coord.coord2,
          })),
        }));
      },
    },
  };

export default zonaSugeridaResolvers;
  