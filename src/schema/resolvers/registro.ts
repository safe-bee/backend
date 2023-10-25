function groupByDate(registros) {
  const groupedRegistros = {};

  registros.forEach((registro) => {
    const date = new Date(registro.fecha);
    const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
    const year = new Intl.DateTimeFormat('es-ES', { year: 'numeric' }).format(date);
    const monthYear = `${month} | ${year}`;

    if (!groupedRegistros[monthYear]) {
      groupedRegistros[monthYear] = { registros: [] };
    }

    groupedRegistros[monthYear].registros.push(registro);
  });

  return groupedRegistros;
}

const registroResolvers = {
  Detalle: {
    __resolveType(obj, context, info) {
      console.log("Objeto en __resolveType: ", obj);
      // console.log("Objeto recibido en __resolveType:", obj.items);

      // Busca el objeto con header "tipoRegistro" y obtiene su valor
    const tipoRegistroObj = obj.find(detail => detail.header === "tipoRegistro");
    const tipoRegistro = tipoRegistroObj ? tipoRegistroObj.value : null;
    console.log("Objeto en tipoRegistro: ", tipoRegistro);  
    if (tipoRegistro) {
      // Capitaliza el primer carácter y devuelve
      return tipoRegistro.charAt(0).toUpperCase() + tipoRegistro.slice(1);
    }

    return "DetalleVacio";
  },
  },

  Query: {
    registros: async (parent, args, { prisma }) => {
      console.log("Args recibidos:", args);
      const { colmenaId, tipoRegistro } = args;
      const registros = await prisma.registro.findMany({
        where: { colmenaId, tipoRegistro },
        include: {
          colmena: true,
          tarea: true,
          inspeccion: true,
          registroAlimentacion: true,
          registroTratamiento: true,
          registroCosecha: true,
          registroVarroa: true,
          registroCuadros: true,
        },
      });
      // console.log("Registros desde la DB:", registros);

      // Ordena las registros por fecha de forma descendente
      const registrosOrdenadas = registros.sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );

      const registrosWithDetails = registrosOrdenadas.map((registro) => {
        //  const detalles = {
        //    ...(registro.inspeccion && { inspeccion: registro.inspeccion }),
        //    ...(registro.registroAlimentacion && { registroAlimentacion: registro.registroAlimentacion }),
        //    ...(registro.registroTratamiento && { registroTratamiento: registro.registroTratamiento }),
        //    ...(registro.registroCosecha && { registroCosecha: registro.registroCosecha }),
        //    ...(registro.registroVarroa && { registroVarroa: registro.registroVarroa }),
        //    ...(registro.registroCuadros && { registroCuadros: registro.registroCuadros }),
        //  };

        const detalleKeys = Object.keys(registro).filter(
          (key) =>
            (key.startsWith("registro") || key === "inspeccion") && registro[key]
        );

        let detalles: { [key: string]: any; tipoRegistro?: string } = {};
        if (detalleKeys.length > 0) {
          detalles = { ...registro[detalleKeys[0]], tipoRegistro: detalleKeys[0] };
          if (detalleKeys[0] === "inspeccion") {
            detalles.tipoRegistro = "Inspeccion"; // Manejo especial para 'inspeccion'
          }
        }

        const transformedDetails = Object.keys(detalles)
          .filter(key => !key.startsWith("detalle") && key !== "registroId" && key !== "clima" && key !== "temperatura" && key !== "foto_inspeccion" && key !== "tipoRegistro")
          .map(key => ({ header: key, value: detalles[key] }));

        const bloque = {
          ...registro,
          detalles: transformedDetails,
        };

        // console.log("Bloque", JSON.stringify(bloque, null, 2));

        return bloque;
      });

      const groupedRegistros = groupByDate(registrosWithDetails);

      // console.log(JSON.stringify(groupedRegistros, null, 2));

      const result = Object.keys(groupedRegistros).map((monthYear) => ({
        monthYear,
        registros: groupedRegistros[monthYear].registros,
      }));
      // console.log('Result:', result);
      return result;
    },

    registro: async (parent, args, { prisma }) => {
      const { id } = args;
      return await prisma.registro.findUnique({
        where: { id },
        include: {
          colmena: true,
          tarea: true,
          inspeccion: true,
          registroAlimentacion: true,
          registroTratamiento: true,
          registroCosecha: true,
          registroVarroa: true,
          registroCuadros: true,
        },
      });
    },
  },
  Mutation: {
    createRegistro: async (parent, args, { prisma }) => {

      const registro = await prisma.registro.create({ data: { ...args } });

      // Si recibo tareaId, voy a la tarea y la marco como terminada
      const { tareaId } = args;
      if (tareaId) {
        await prisma.tarea.update({
          where: { id: tareaId },
          data: { terminada: true },
        });
      }

      return registro
    },
    updateRegistro: async (parent, args, { prisma }) => {
      const { id, ...data } = args;
      const { tareaId } = args;

      const registro = await prisma.registro.update({ where: { id }, data });

      // Si recibo tareaId, voy a la tarea y la marco como terminada
      if (tareaId) {
        await prisma.tarea.update({
          where: { id: tareaId },
          data: { terminada: true },
        });
      }
      
      return registro
    },
    deleteRegistro: async (parent, args, { prisma }) => {
      const { id } = args;
      return await prisma.registro.delete({ where: { id } });
    },
  },
};

export default registroResolvers;
