import gql from 'graphql-tag';

const registroDef = gql`
  type Registro {    
    id: Int!
    fecha: DateTime!
    colmenaId: Int!
    colmena: Colmena
    tipoRegistro: TipoRegistro!
    detalles: DetallesRegistro
    tarea: Tarea
  }

  enum TipoRegistro {
    TRATAMIENTO
    COSECHA
    ALIMENTACION
    CAMBIO_DE_CUADROS
    VARROA
    HIBERNACION
    MUERTE
    INSPECCION
  }

  union DetallesRegistro = RegistroAlimentacion | RegistroTratamiento | RegistroCosecha | RegistroVarroa | RegistroCuadros | Inspeccion | DetalleVacio

  type RegistroAlimentacion {
    registroId: Int!
    registro: Registro!
    alimento: String
    cantidadAlimentacion: Float
  }

  type RegistroTratamiento {
    registroId: Int!
    registro: Registro!
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

  type RegistroCosecha {
    registroId: Int!
    registro: Registro!
    tipoUnidad: TipoUnidad
    cantidadCosecha: Int
  }

  enum TipoUnidad {
    LIBRAS
    KILOS
    CUADROS
  }

  type RegistroVarroa {
    registroId: Int!
    registro: Registro!
    tipoMetodo: TipoMetodo
    porcentaje: Float
  }

  enum TipoMetodo {
    ALCOHOL
    DETERGENTE
    AZUCAR
    OTRO
  }

  type RegistroCuadros {
    registroId: Int!
    registro: Registro!
    cantidad: Int
  }

  type Inspeccion {
    registroId: Int!
    registro: Registro!
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

  type RegistroGroup {
    monthYear: String!
    registros: [Registro!]!
  }

  extend type Query {
    registros(colmenaId: Int, tipoRegistro: TipoRegistro): [RegistroGroup!]!
    registro(id: Int!): Registro
    inspeccion(id: Int!): Inspeccion
    tratamiento(id: ID!): RegistroTratamiento
    cosecha(id: ID!): RegistroCosecha
    alimentacion(id: ID!): RegistroAlimentacion
    cambio_de_cuadros(id: ID!): RegistroCuadros
    varroa(id: ID!): RegistroVarroa
    hibernacion(id: ID!): Registro
    muerte(id: ID!): Registro
  }

  extend type Mutation {
  
    createRegistro(
      fecha: DateTime!
      colmenaId: Int!
      tipoRegistro: TipoRegistro!
    ): Registro!

    updateRegistro(
      id: Int!, 
      fecha: DateTime
      colmenaId: Int
    ): Registro!

    deleteRegistro(id: Int!): Registro!

    createInspeccion(colmenaId: ID!, registroId: ID, clima: Clima, temperatura: Int, estado_cajon: Boolean, detalle_cajon: String, estado_poblacion: Boolean, detalle_poblacion: String, estado_reina_larvas: Boolean, detalle_reina_larvas: String, estado_flora: Boolean, detalle_flora: String, estado_alimento: Boolean, detalle_alimento: String, estado_plagas: Boolean, detalle_plagas: String, foto_inspeccion: String): Inspeccion
    createTratamiento(colmenaId: ID!, tipoPlaga: TipoPlaga, producto: String, dosis: String): RegistroTratamiento
    createCosecha(colmenaId: ID!, tipoUnidad: TipoUnidad, cantidadCosecha: Float): RegistroCosecha
    createAlimentacion(colmenaId: ID!, alimento: String, cantidadAlimentacion: Float): RegistroAlimentacion
    createCambioDeCuadros(colmenaId: ID!, cantidad: Int): RegistroCuadros
    createVarroa(colmenaId: ID!, registroId: ID, tipoMetodo: TipoMetodo, porcentaje: Float): RegistroVarroa
    createHibernacion(colmenaId: ID!): Registro
    createMuerte(colmenaId: ID!): Registro
    
    deleteInspeccion(id: ID!): Inspeccion
    deleteTratamiento(id: ID!): RegistroTratamiento
    deleteCosecha(id: ID!): RegistroCosecha
    deleteAlimentacion(id: ID!): RegistroAlimentacion
    deleteCambioDeCuadros(id: ID!): RegistroCuadros
    deleteVarroa(id: ID!): RegistroVarroa
    deleteHibernacion(id: ID!): Registro
    deleteMuerte(id: ID!): Registro
  }
`;

export default registroDef;

