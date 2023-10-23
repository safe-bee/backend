function groupByDate(tareas) {
  const groupedTareas = {};

  tareas.forEach((tarea) => {
    const date = new Date(tarea.fecha);
    const monthYear = `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;

    if (!groupedTareas[monthYear]) {
      groupedTareas[monthYear] = { tareas: [] };
    }

    groupedTareas[monthYear].tareas.push(tarea);
  });

  return groupedTareas;
}

const tareaResolvers = {
  DetallesTarea: {
    __resolveType(obj, context, info) {
      console.log("Objeto en __resolveType: ", obj);
      // console.log("Objeto recibido en __resolveType:", obj.items);

      if (obj.tipoTarea) {
        // Capitaliza el primer carácter y devuelve
        return obj.tipoTarea.charAt(0).toUpperCase() + obj.tipoTarea.slice(1);
      }

      return "DetalleVacio";
    },
  },

  Query: {
    tareas: async (parent, args, { prisma }) => {
      console.log("Args recibidos:", args);
      const { colmenaId, tipoTarea } = args;
      const tareas = await prisma.tarea.findMany({
        where: { colmenaId, tipoTarea },
        include: {
          colmena: true,
          alerta: true,
          inspeccion: true,
          tareaAlimentacion: true,
          tareaTratamiento: true,
          tareaCosecha: true,
          tareaVarroa: true,
          tareaCuadros: true,
        },
      });
      // console.log("Tareas desde la DB:", tareas);

      // Ordena las tareas por fecha de forma descendente
      const tareasOrdenadas = tareas.sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );

      const tareasWithDetails = tareasOrdenadas.map((tarea) => {
        //  const detalles = {
        //    ...(tarea.inspeccion && { inspeccion: tarea.inspeccion }),
        //    ...(tarea.tareaAlimentacion && { tareaAlimentacion: tarea.tareaAlimentacion }),
        //    ...(tarea.tareaTratamiento && { tareaTratamiento: tarea.tareaTratamiento }),
        //    ...(tarea.tareaCosecha && { tareaCosecha: tarea.tareaCosecha }),
        //    ...(tarea.tareaVarroa && { tareaVarroa: tarea.tareaVarroa }),
        //    ...(tarea.tareaCuadros && { tareaCuadros: tarea.tareaCuadros }),
        //  };

        const detalleKeys = Object.keys(tarea).filter(
          (key) =>
            (key.startsWith("tarea") || key === "inspeccion") && tarea[key]
        );

        let detalles: { [key: string]: any; tipoTarea?: string } = {};
        if (detalleKeys.length > 0) {
          detalles = { ...tarea[detalleKeys[0]], tipoTarea: detalleKeys[0] };
          if (detalleKeys[0] === "inspeccion") {
            detalles.tipoTarea = "Inspeccion"; // Manejo especial para 'inspeccion'
          }
        }

        // const detallesKey = Object.keys(tarea).find(key => key.startsWith('tarea') && tarea[key]);
        // const detalles = detallesKey ? tarea[detallesKey] : {};

        const bloque = {
          ...tarea,
          detalles,
        };

        console.log("Bloque", JSON.stringify(bloque, null, 2));

        return bloque;
      });

      const groupedTareas = groupByDate(tareasWithDetails);

      // console.log(JSON.stringify(groupedTareas, null, 2));

      const result = Object.keys(groupedTareas).map((monthYear) => ({
        monthYear,
        tareas: groupedTareas[monthYear].tareas,
      }));
      // console.log('Result:', result);
      return result;
    },

    tarea: async (parent, args, { prisma }) => {
      const { id } = args;
      return await prisma.tarea.findUnique({
        where: { id },
        include: {
          colmena: true,
          alerta: true,
          inspeccion: true,
          tareaAlimentacion: true,
          tareaTratamiento: true,
          tareaCosecha: true,
          tareaVarroa: true,
          tareaCuadros: true,
        },
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
  },
};

export default tareaResolvers;
