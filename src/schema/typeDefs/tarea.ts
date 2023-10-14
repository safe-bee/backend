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

  union DetallesTarea = TareaAlimentacion | TareaTratamiento | TareaCosecha | TareaVarroa | TareaCuadros | Inspeccion

  type TareaAlimentacion {
    alimento: String
    cantidadAlimentacion: Float
  }

  type TareaTratamiento {
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
    tipoUnidad: TipoUnidad
    cantidadCosecha: Int
  }

  enum TipoUnidad {
    LIBRAS
    KILOS
    CUADROS
  }

  type TareaVarroa {
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
    cantidad: Int
  }

  type Inspeccion {
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

  extend type Query {
    tareas(colmenaId: Int, tipoTarea: TipoTarea): [Tarea!]!
    tarea(id: Int!): Tarea
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
  }
`;

export default tareaDef;