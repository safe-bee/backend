import gql from 'graphql-tag';

const registroDef = gql`
  type Registro {    
    id: Int!
    fecha: DateTime!
    colmenaId: Int!
    colmena: Colmena
    notas: String
    tipoRegistro: TipoRegistro!
    detalles: [Detalle!]!
    tareaId: Int
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

  type Detalle {
    header: String!
    value: String!
  }

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
    estadoCajon: Boolean!
    detalleCajonSellado: Sellado
    detalleCajonInvasores: Invasores
    estadoPoblacion: Boolean!
    detallePoblacionEstado: Estado
    detallePoblacionNumCuadros: Float
    detallePoblacionFaltaEspacio: Boolean
    estadoReinaLarvas: Boolean!
    detalleReinaLarvasQueSeVe: QueSeVe
    detalleReinaLarvasPatronDeCria: PatronDeCria
    estadoFlora: Boolean!
    detalleFloraEstado: Estado
    detalleFloraDispRecursos: DisponibilidadRecursos
    estadoAlimento: Boolean!
    detalleAlimentoEstado: Estado
    detalleAlimentoDispRecursos: DisponibilidadRecursos
    estadoPlagas: Boolean!
    detallePlagasPlagas: Plagas
    detallePlagasTemperamentoAbejas: TemperamentoAbejas
    fotoInspeccion: String
  }

  enum Clima {
    SOLEADO
    NUBLADO
    TORMENTA
    LLUVIA
  }

  enum Sellado {
    MUY_BUENO
    BUENO
    NORMAL
    MALO
    MUY_MALO
  }
  
  enum Invasores {
    POLILLAS
    AVISPAS
    HORMIGAS
  }
  
  enum Estado {
    MUY_BUENO
    BUENO
    NORMAL
    BAJO
    MUY_BAJO
  }
  
  enum QueSeVe {
    REINA
    CRIA_POSTURA_ESPIRAL_CORRECTA
    CRIA_POSTURA_ESPIRAL_INCORRECTA
    NADA
  }
  
  enum PatronDeCria {
    NINGUNA
    MUY_VISIBLE
    VISIBLE
    MAYORMENTE_SOLIDA
    SOLIDA
    ENFERMAS
  }
  
  enum DisponibilidadRecursos {
    ALTO
    MEDIO
    BAJO
    NINGUNO
  }
  
  enum Plagas {
    VARROA
    NOSEMA
    ESCARABAJOS
    RATAS
    HORMIGAS
    POLILLAS
    AVISPAS
    NINGUNA
  }
  
  enum TemperamentoAbejas {
    CALMAS
    NERVIOSAS
    AGRESIVAS
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
      tareaId: Int
    ): Registro!

    updateRegistro(
      id: Int!, 
      fecha: DateTime
      colmenaId: Int
      tareaId: Int
    ): Registro!

    deleteRegistro(id: Int!): Registro!

    createInspeccion(colmenaId: ID!, tareaId: Int, fecha: DateTime, notas: String, registroId: ID, clima: Clima, temperatura: Int, estadoCajon: Boolean, detalleCajonSellado: Sellado, detalleCajonInvasores: Invasores, estadoPoblacion: Boolean, detallePoblacionEstado: Estado, detallePoblacionNumCuadros: Float, detallePoblacionFaltaEspacio: Boolean, estadoReinaLarvas: Boolean, detalleReinaLarvasQueSeVe: QueSeVe, detalleReinaLarvasPatronDeCria: PatronDeCria, estadoFlora: Boolean, detalleFloraEstado: Estado, detalleFloraDispRecursos: DisponibilidadRecursos, estadoAlimento: Boolean, detalleAlimentoEstado: Estado, detalleAlimentoDispRecursos: DisponibilidadRecursos, estadoPlagas: Boolean, detallePlagasPlagas: Plagas, detallePlagasTemperamentoAbejas: TemperamentoAbejas, fotoInspeccion: String ): Inspeccion
    createTratamiento(colmenaId: ID!, tareaId: Int, fecha: DateTime, notas: String, tipoPlaga: TipoPlaga, producto: String, dosis: String): RegistroTratamiento
    createCosecha(colmenaId: ID!, tareaId: Int, fecha: DateTime, notas: String, tipoUnidad: TipoUnidad, cantidadCosecha: Float): RegistroCosecha
    createAlimentacion(colmenaId: ID!, tareaId: Int, fecha: DateTime, notas: String, alimento: String, cantidadAlimentacion: Float): RegistroAlimentacion
    createCambioDeCuadros(colmenaId: ID!, tareaId: Int, fecha: DateTime, notas: String, cantidad: Int): RegistroCuadros
    createVarroa(colmenaId: ID!, tareaId: Int, fecha: DateTime, notas: String, registroId: ID, tipoMetodo: TipoMetodo, porcentaje: Float): RegistroVarroa
    createHibernacion(colmenaId: ID!, tareaId: Int, fecha: DateTime, notas: String): Registro
    createMuerte(colmenaId: ID!, tareaId: Int, fecha: DateTime, notas: String): Registro
  }
`;

export default registroDef;
