import { point, polygon } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

export async function procesarInformacionParaTratamientoDeVarroa(prisma, colmenaId) {
  // Obtengo todas las inspecciones de hace un año para una colmena específica ordenardas por fecha
  const fechaDelAnioPasado = new Date();
  fechaDelAnioPasado.setFullYear(fechaDelAnioPasado.getFullYear() - 1);
  const inspecciones = await prisma.inspeccion.findMany({
    where: {
      AND: [
        {registro: { colmenaId: colmenaId }},
        {registro: { fecha: { gte: fechaDelAnioPasado} }},
      ],
    },
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

  // Fechas anteriores
  const fechasAnteriores = await prisma.tarea.findMany({
    where: {
      colmenaId: colmenaId,
      tipoRegistro: "VARROA",
      descripcion: "Alerta automática de control de Varroa",
    },
    select: { fecha: true },
  });

  // Creo un array con las fechas anteriores + la nueva fecha calculada
  const fechasParaSiguienteAnio = fechasAnteriores.map(({fecha}) => {
    const fechaConSiguienteAnio = new Date(fecha);
    fechaConSiguienteAnio.setFullYear((new Date()).getFullYear() + 1);
    return fechaConSiguienteAnio;
  } );
  fechasParaSiguienteAnio.push(fechaPromedioDelAnioQueViene);

  // Saco el promedio del array de fechas
  const totalMillis = fechasParaSiguienteAnio.reduce((total, fecha) => total + (new Date(fecha)).getTime(), 0);
  const promedioMillis = totalMillis / fechasParaSiguienteAnio.length;
  const fechaPromedioTotalDelAnioQueViene = new Date(promedioMillis)

  // Programo una nueva tarea de control de Varroa para esa fecha dentro de un año
  // Primero, intenta buscar un registro existente.
  const existingTarea = await prisma.tarea.findFirst({
    where: {
      fecha: fechaPromedioTotalDelAnioQueViene,
      colmenaId: colmenaId,
      terminada: false,
      tipoRegistro: "VARROA",
    },
  });
  if (!existingTarea) {
    // El registro no existe, lo creo.
    await prisma.tarea.create({
      data: {
        descripcion: "Alerta automática de control de Varroa",
        fecha: fechaPromedioTotalDelAnioQueViene,
        colmenaId: colmenaId,
        terminada: false,
        tipoRegistro: "VARROA",
      },
    });
  }

}


export function estaEnSudoesteBuenosAires(cordX, cordY) {

  const pt = point([cordX, cordY]);
  const poly = polygon([
    [
      [-36.23873, -59.97445],
      [-36.6574, -63.32769],
      [-39.32779, -63.36597],
      [-40.56578, -63.37687],
      [-38.91, -60.37751],
      [-37.23948, -59.18996],
      [-36.63943, -59.24163],
      [-36.23873, -59.97445],
    ],
  ]);

  return booleanPointInPolygon(pt, poly)
}