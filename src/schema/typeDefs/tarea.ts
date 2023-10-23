import gql from 'graphql-tag';

const tareaDef = gql`
  type Tarea {    
    id: Int!
    fecha: DateTime!
    colmenaId: Int!
    colmena: Colmena
    tipoTarea: TipoTarea!
    detalles: DetallesTarea
    alerta: Alerta
  }

  enum TipoTarea {
    TRATAMIENTO
    COSECHA
    ALIMENTACION
    CAMBIO_DE_CUADROS
    VARROA
    HIBERNACION
    MUERTE
    INSPECCION
  }

  union DetallesTarea = TareaAlimentacion | TareaTratamiento | TareaCosecha | TareaVarroa | TareaCuadros | Inspeccion | DetalleVacio

  type TareaAlimentacion {
    tareaId: Int!
    tarea: Tarea!
    alimento: String
    cantidadAlimentacion: Float
  }

  type TareaTratamiento {
    tareaId: Int!
    tarea: Tarea!
    tipoPlaga: TipoPlaga
    producto: String
    dosis: String
  }

  enum TipoPlaga {
    VARROA
    NOSEMA
    POLILLAS
    OTRAS
  }

  type TareaCosecha {
    tareaId: Int!
    tarea: Tarea!
    tipoUnidad: TipoUnidad
    cantidadCosecha: Int
  }

  enum TipoUnidad {
    LIBRAS
    KILOS
    CUADROS
  }

  type TareaVarroa {
    tareaId: Int!
    tarea: Tarea!
    tipoMetodo: TipoMetodo
    porcentaje: Float
  }

  enum TipoMetodo {
    ALCOHOL
    DETERGENTE
    AZUCAR
    OTRO
  }

  type TareaCuadros {
    tareaId: Int!
    tarea: Tarea!
    cantidad: Int
  }

  type Inspeccion {
    tareaId: Int!
    tarea: Tarea!
    clima: Clima
    temperatura: Int
    estado_cajon: Boolean
    detalle_cajon: String
    estado_poblacion: Boolean
    detalle_poblacion: String
    estado_reina_larvas: Boolean
    detalle_reina_larvas: String
    estado_flora: Boolean
    detalle_flora: String
    estado_alimento: Boolean
    detalle_alimento: String
    estado_plagas: Boolean
    detalle_plagas: String
    foto_inspeccion: String
  }

  enum Clima {
    SOLEADO
    NUBLADO
    TORMENTA
    LLUVIA
  }

  type DetalleVacio {
    descripcion: String
  }

  type TareaGroup {
    monthYear: String!
    tareas: [Tarea!]!
  }

  extend type Query {
    tareas(colmenaId: Int, tipoTarea: TipoTarea): [TareaGroup!]!
    tarea(id: Int!): Tarea
    inspeccion(id: Int!): Inspeccion
    tratamiento(id: ID!): TareaTratamiento
    cosecha(id: ID!): TareaCosecha
    alimentacion(id: ID!): TareaAlimentacion
    cambio_de_cuadros(id: ID!): TareaCuadros
    varroa(id: ID!): TareaVarroa
    hibernacion(id: ID!): Tarea
    muerte(id: ID!): Tarea
  }

  extend type Mutation {
  
    createTarea(
      fecha: DateTime!
      colmenaId: Int!
      tipoTarea: TipoTarea!
    ): Tarea!

    updateTarea(
      id: Int!, 
      fecha: DateTime
      colmenaId: Int
    ): Tarea!

    deleteTarea(id: Int!): Tarea!

    createInspeccion(colmenaId: ID!, tareaId: ID, clima: Clima, temperatura: Int, estado_cajon: Boolean, detalle_cajon: String, estado_poblacion: Boolean, detalle_poblacion: String, estado_reina_larvas: Boolean, detalle_reina_larvas: String, estado_flora: Boolean, detalle_flora: String, estado_alimento: Boolean, detalle_alimento: String, estado_plagas: Boolean, detalle_plagas: String, foto_inspeccion: String): Inspeccion
    createTratamiento(colmenaId: ID!, tipoPlaga: TipoPlaga, producto: String, dosis: String): TareaTratamiento
    createCosecha(colmenaId: ID!, tipoUnidad: TipoUnidad, cantidadCosecha: Float): TareaCosecha
    createAlimentacion(colmenaId: ID!, alimento: String, cantidadAlimentacion: Float): TareaAlimentacion
    createCambioDeCuadros(colmenaId: ID!, cantidad: Int): TareaCuadros
    createVarroa(colmenaId: ID!, tareaId: ID, tipoMetodo: TipoMetodo, porcentaje: Float): TareaVarroa
    createHibernacion(colmenaId: ID!): Tarea
    createMuerte(colmenaId: ID!): Tarea
    
    deleteInspeccion(id: ID!): Inspeccion
    deleteTratamiento(id: ID!): TareaTratamiento
    deleteCosecha(id: ID!): TareaCosecha
    deleteAlimentacion(id: ID!): TareaAlimentacion
    deleteCambioDeCuadros(id: ID!): TareaCuadros
    deleteVarroa(id: ID!): TareaVarroa
    deleteHibernacion(id: ID!): Tarea
    deleteMuerte(id: ID!): Tarea
  }
`;

export default tareaDef;

