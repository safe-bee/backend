export async function procesarInformacionParaTratamientoDeVarroa(prisma, colmenaId) {
  // Obtengo todas las inspecciones para una colmena específica ordenardas por fecha
  const inspecciones = await prisma.inspeccion.findMany({
    where: { registro: { colmenaId: colmenaId } },
    orderBy: { registro: { fecha: "asc" } },
    include: { registro: true },
  });

  // Calculo la pendiente entre las inspecciones adyacentes
  const pendientes = [];
  for (let i = 1; i < inspecciones.length; i++) {
    const fecha1 = new Date(inspecciones[i - 1].registro.fecha);
    const fecha2 = new Date(inspecciones[i].registro.fecha);
    const poblacion1 = inspecciones[i - 1].detallePoblacionNumCuadros;
    const poblacion2 = inspecciones[i].detallePoblacionNumCuadros;
    // Calcular la diferencia en milisegundos entre las fechas
    const diferenciaFechas = fecha2.getTime() - fecha1.getTime();
    // Convertir la diferencia en días
    const diferenciaDias = diferenciaFechas / (1000 * 60 * 60 * 24);
    const pendiente = (poblacion2 - poblacion1) / diferenciaDias;
    pendientes.push({ fecha1, fecha2, pendiente });
  }

  // Encontrar las dos fechas con la mayor pendiente
  const max = pendientes.reduce(function (prev, current) {
    return prev && prev.pendiente > current.pendiente ? prev : current;
  });

  // Calcular la fecha media entre las dos fechas con mayor pendiente
  const fechaPromedio = new Date(
    (max.fecha1.getTime() + max.fecha2.getTime()) / 2
  );
  const fechaPromedioDelAnioQueViene = new Date(
    fechaPromedio.setFullYear(fechaPromedio.getFullYear() + 1)
  );

  // Programo una nueva tarea de control de Varroa para esa fecha dentro de un año
  // Primero, intenta buscar un registro existente.
  const existingTarea = await prisma.tarea.findFirst({
    where: {
      fecha: fechaPromedioDelAnioQueViene,
      colmenaId: colmenaId,
      terminada: false,
      tipoRegistro: "VARROA",
    },
  });
  if (!existingTarea) {
    // El registro no existe, lo creo.
    await prisma.tarea.create({
      data: {
        descripcion: "Control de Varroa",
        fecha: fechaPromedioDelAnioQueViene,
        colmenaId: colmenaId,
        terminada: false,
        tipoRegistro: "VARROA",
      },
    });
  }

  console.log(max);
}
