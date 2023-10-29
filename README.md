# Backend

## Setup para correr el proyecto localmente
1. Duplicar el archivo `.env.example` y renombrarlo `.env`
2. Crear una base de datos Postgres con address:port = localhost:5432
3. Modificar la variable `DATABASE_URL` con tu USER, PASSWORD y DBNAME de Postgres
4. instala la interfaz CLI de NestJS: `npm install -g @nestjs/cli`
5. Instala dependencias: `npm install`. Levantar el servidor: `npm run start`
6. Tirar el comando `npx prisma db push` para crear o actualizar las tablas en base a schema.prisma
7. Levantar los seeders: `npx prisma db seed`

### Comandos útiles para el desarrollo
- Reiniciar la base de datos, correr migrations y seeders todo en uno para el desarrollo: `npx prisma db push --force-reset && npx prisma db seed`
- Formatear el archivo schema.prisma: `npx prisma format`



## Comandos de nuestra API de GraphQL

Ejemplo de query y respuesta:

```graphql
query Apiario{
  apiario(id: 1) {
    id,
    nombre,
    latitud,
    longitud,
    direccion,
    tipo_ambiente,
    fecha_creacion
  }
}
```
```json
{
  "data": {
    "apiario": {
      "id": 1,
      "nombre": "Apiario 1",
      "latitud": 40.7128,
      "longitud": -74.006,
      "direccion": "123 Calle Principal",
      "tipo_ambiente": "RURAL",
      "fecha_creacion": "2023-08-21T20:05:58.829Z"
    }
  }
}
```


### Apiarios:

```graphql
query Apiarios {
  apiarios {
    id,
    nombre,
    latitud,
    longitud,
    direccion,
    tipo_ambiente,
    fecha_creacion,
    colmenas {
      id,
      nombre, 
      foto1
    }
  }
}
```

```graphql
query Apiario{
  apiario(id: 1) {
    id,
    nombre,
    latitud,
    longitud,
    direccion,
    tipo_ambiente,
    fecha_creacion
    colmenas {
      id
      nombre
      apiarioId
      tipo
      datos_total_cuadros
      datos_color
      datos_origen
      datos_fecha_establecimiento
      reina_tipo
      reina_color
      reina_fecha_aceptacion
      reina_notas
      foto1
      foto2
      foto3
    }
  }
}
```

```graphql
mutation {
  createApiario(
    nombre: "Apiario Nuevo",
    latitud: 42.3601,
    longitud: -71.0589,
    direccion: "456 Calle Principal",
    tipo_ambiente: RURAL,
    fecha_creacion: "2023-04-20T03:14:24.405Z"
  ) {
    id
    nombre
    latitud
    longitud
    direccion
    tipo_ambiente
  }
}
```

```graphql
mutation {
  updateApiario(
    id: 3, 
    nombre: "Apiario Editadoo",
    latitud: 69,
    longitud: -4.20,
    direccion: "Calle falsa 123",
    tipo_ambiente: URBANO
  ) {
    id
    nombre
    latitud
    longitud
    direccion
    tipo_ambiente
  }
}
```

```graphql
mutation {
  deleteApiario(id: 3) {
    id
    nombre
    latitud
    longitud
    direccion
    tipo_ambiente
  }
}
```

### Colmenas:

```graphql
query Colmenas {
  colmenas {
    id
    nombre
    apiarioId
    apiario {
      id
      nombre
    }
    tipo
    datos_total_cuadros
    datos_color
    datos_origen
    datos_fecha_establecimiento
    reina_tipo
    reina_color
    reina_fecha_aceptacion
    reina_notas
    foto1
    foto2
    foto3
    tareas {
      id
      descripcion
      tipoRegistro
      terminada
    }
  }
}
```

```graphql
query Colmena{
  colmena(id: 1) {
    id
    nombre
    apiarioId
    apiario {
      id
      nombre
    }
    tipo
    datos_total_cuadros
    datos_color
    datos_origen
    datos_fecha_establecimiento
    reina_tipo
    reina_color
    reina_fecha_aceptacion
    reina_notas
    foto1
    foto2
    foto3
    tareas {
      id
      descripcion
      tipoRegistro
      terminada
    }
  }
}
```

```graphql
mutation crearColmena{
  createColmena(
    nombre: "Nueva Colmena"
    apiarioId: 2
    tipo: TOPBAR
    datos_total_cuadros: "20"
    datos_color: "Amarillo"
    datos_origen: ENJAMBRE
    datos_fecha_establecimiento: "2023-08-30T12:00:00Z"
    reina_tipo: ITALIANA
    reina_color: AMARILLO
    reina_fecha_aceptacion: "2023-08-25T10:30:00Z"
    reina_notas: "Reina saludable y activa"
    foto1: "URL de la foto 1"
    foto2: "URL de la foto 2"
    foto3: "URL de la foto 3"
  ) {
    id
    nombre
    apiarioId
    tipo
    datos_total_cuadros
    datos_color
    datos_origen
    datos_fecha_establecimiento
    reina_tipo
    reina_color
    reina_fecha_aceptacion
    reina_notas
  }
}
```

```graphql
mutation {
  updateColmena(
    id: 1
    nombre: "Colmena Editada"
    apiarioId: 2
    tipo: TOPBAR
    datos_total_cuadros: "20"
    datos_color: "Amarillo"
    datos_origen: ENJAMBRE
    datos_fecha_establecimiento: "2023-08-30T12:00:00Z"
    reina_tipo: ITALIANA
    reina_color: ROJO
    reina_fecha_aceptacion: "2023-08-25T10:30:00Z"
    reina_notas: "Reina saludable y activa"
    foto1: "URL de la foto 1"
    foto2: "URL de la foto 2"
    foto3: "URL de la foto 3"
  ) {
    id
    nombre
    apiarioId
    tipo
    datos_total_cuadros
    datos_color
    datos_origen
    datos_fecha_establecimiento
    reina_tipo
    reina_color
    reina_fecha_aceptacion
    reina_notas
    foto1
    foto2
    foto3
  }
}
```

```graphql
mutation {
  deleteColmena(id: 1) {
    id
    nombre
    apiarioId
    tipo
    datos_total_cuadros
    datos_color
    datos_origen
    datos_fecha_establecimiento
    reina_tipo
    reina_color
    reina_fecha_aceptacion
    reina_notas
    foto1
    foto2
    foto3
  }
}
```


### Zonas Sugeridas:

```graphql
query ZonasSugeridas {
  zonasSugeridas {
    nombre
    coordenadas {
      coord1
      coord2
    }
  }
}
```


### Tareas

```graphql
query TareasPendientesPorColmenaYTipo {
  tareasPendientesPorColmenaYTipo(colmenaId: 1, tipoRegistro: ALIMENTACION) {
    id
    descripcion
    fecha
    colmenaId
    terminada
    tipoRegistro
    registro {
      id
      fecha
      colmenaId
      tipoRegistro
    }
  }
}
```

```graphql
query TareasPendientes{
  tareasPendientes {
    id
    descripcion
    fecha
    colmenaId
    terminada
    tipoRegistro
    registro {
      id
      fecha
      colmenaId
      tipoRegistro
    }
  }
}

```graphql
query Tareas{
  tareas {
    id
    descripcion
    fecha
    colmenaId
    terminada
    tipoRegistro
    registro {
      id
      fecha
      colmenaId
      tipoRegistro
    }
  }
}
```

```graphql
query Tarea{
  tarea(id: 1) {
    id
    descripcion
    fecha
    colmenaId
    terminada
    tipoRegistro
    registro {
      id
      fecha
      colmenaId
      tipoRegistro
    }
  }
}
```

```graphql
mutation CreateTarea{
  createTarea(
    descripcion: "Nueva tarea"
    fecha: "2023-08-21T20:05:58.829Z"
    colmenaId: 1
    terminada: false
    tipoRegistro: ALIMENTACION
  ) {
    id
    descripcion
    fecha
    colmenaId
    terminada
    tipoRegistro
  }
}
```

```graphql
mutation UpdateTarea{
  updateTarea(
    id: 1
    descripcion: "Tarea actualizada"
    fecha: "2024-08-21T20:05:58.829Z"
    colmenaId: 2
    terminada: true
    tipoRegistro: VARROA
  ) {
    id
    descripcion
    fecha
    colmenaId
    terminada
    tipoRegistro
  }
}
```

```graphql
mutation DeleteTarea{
  deleteTarea(id: 1) {
    id
    descripcion
    fecha
    colmenaId
    terminada
    tipoRegistro
  }
}
```


### Registros
```graphql
query Registros {
  registros {
    id
    fecha
    tipoRegistro
    colmena {
      nombre
    }
    tarea {
      descripcion
      terminada
    }
  }
}
```

```graphql
query Registro {
  registro(id: 1) {
    id
    fecha
    colmenaId
    tipoRegistro
    colmena {
      id
      nombre
    }
    tarea {
      descripcion
      terminada
    }
  }
}
```

```graphql
mutation CreateRegistro {
  createRegistro(
    fecha: "2023-08-30T12:00:00Z"
    tipoRegistro: ALIMENTACION
    colmenaId: 1
    tareaId: 1 # Opcional
  ) {
    id
    fecha
    colmenaId
    tareaId
  }
}
```

```graphql
mutation UpdateRegistro {
  updateRegistro(
    id: 1
    colmenaId: 2
    tareaId: 2 # Opcional
  ) {
    id
    fecha
    colmenaId
    tareaId
  }
}
```

```graphql
mutation DeleteRegistro {
  deleteRegistro(id: 1) {
    id
    fecha
    colmenaId
    tareaId
  }
}
```

```graphql
query HistorialRegistros {
  registros (colmenaId: 1) {
    monthYear
    registros {
      id
      fecha
      colmenaId
      notas
      tipoRegistro
      detalles {
        header
        value
      }
    }
  }
}
```

### Registros específicas
```graphql
mutation CrearInspeccion{
  createInspeccion(
    colmenaId: 3,
    fecha: "2023-08-21T20:05:58.829Z",
    notas: "alta inspeccion",
    clima: SOLEADO,
    temperatura: 22,
    estadoCajon: true,
    detalleCajonSellado: BUENO,
    detalleCajonInvasores: POLILLAS,
    estadoPoblacion: true,
    detallePoblacionEstado: BUENO,
    detallePoblacionNumCuadros: 80,
    detallePoblacionFaltaEspacio: false,
    estadoReinaLarvas: true,
    detalleReinaLarvasQueSeVe: REINA,
    detalleReinaLarvasPatronDeCria: VISIBLE,
    estadoFlora: true,
    detalleFloraEstado: BUENO,
    detalleFloraDispRecursos: ALTO,
    estadoAlimento: true,
    detalleAlimentoEstado: BUENO,
    detalleAlimentoDispRecursos: ALTO,
    estadoPlagas: false,
    detallePlagasPlagas: NINGUNA,
    detallePlagasTemperamentoAbejas: CALMAS
  ) {
    registroId
    clima
    temperatura
  }
}
```
Para el id hay que usar el que devolvió la query anterior
```graphql
query GetInspeccion{
  inspeccion(id: 9) {
    registroId
    registro {
      colmenaId
      fecha
      notas
      tareaId
    }
    clima
    temperatura
    estadoCajon
    detalleCajonSellado
    detalleCajonInvasores
    estadoPoblacion
    detallePoblacionEstado
    detallePoblacionNumCuadros
    detallePoblacionFaltaEspacio
    estadoReinaLarvas
    detalleReinaLarvasQueSeVe
    detalleReinaLarvasPatronDeCria
    estadoFlora
    detalleFloraEstado
    detalleFloraDispRecursos
    estadoAlimento
    detalleAlimentoEstado
    detalleAlimentoDispRecursos
    estadoPlagas
    detallePlagasPlagas
    detallePlagasTemperamentoAbejas
    fotoInspeccion
  }
}
```
```graphql
mutation CrearAlimentacion {
  createAlimentacion(
    fecha: "2023-08-21T20:05:58.829Z",
    notas: "Alimentacion rica en sacarosa",
    colmenaId: 3,
    alimento: "Azúcar",
    cantidadAlimentacion: 2.5
  ) {
    registroId
  } 
}
```
Para el id hay que usar el que devolvio la query anterior

```graphql
query getAlimentacion{
  alimentacion(id: 29) {
    registroId
    alimento
    cantidadAlimentacion
    registro {
      fecha
      colmenaId
    }
  }
}
```

Ejemplo de cada registro específico:

```graphql
mutation CrearTratamiento {
  createTratamiento(
    colmenaId: 3,
    tareaId: 1,
    fecha: "2023-08-21T20:05:58.829Z",
    notas: "Tratamiento contra Varroa",
    tipoPlaga: VARROA,
    producto: "Producto X",
    dosis: "5 ml"
  ) {
    registroId
  } 
}
```
```graphql
mutation CrearCosecha {
  createCosecha(
    colmenaId: 3,
    tareaId: 2,
    fecha: "2023-08-21T20:05:58.829Z",
    notas: "Cosecha de miel",
    tipoUnidad: LIBRAS,
    cantidadCosecha: 20.5
  ) {
    registroId
  } 
}
```
```graphql
mutation CrearAlimentacion {
  createAlimentacion(
    colmenaId: 3,
    tareaId: 3,
    fecha: "2023-08-21T20:05:58.829Z",
    notas: "Alimentación rica en sacarosa",
    alimento: "Azúcar",
    cantidadAlimentacion: 2.5
  ) {
    registroId
  } 
}
```
```graphql
mutation CrearCambioDeCuadros {
  createCambioDeCuadros(
    colmenaId: 3,
    tareaId: 4,
    fecha: "2023-08-21T20:05:58.829Z",
    notas: "Cambio de cuadros en la colmena",
    cantidad: 6
  ) {
    registroId
  } 
}
```
```graphql
mutation CrearVarroa {
  createVarroa(
    colmenaId: 3,
    tareaId: 5,
    fecha: "2023-08-21T20:05:58.829Z",
    notas: "Control de Varroa en la colmena",
    tipoMetodo: ALCOHOL,
    porcentaje: 2.5
  ) {
    registroId
  } 
}
```
```graphql
mutation CrearHibernacion {
  createHibernacion(
    colmenaId: 3,
    tareaId: 6,
    fecha: "2023-08-21T20:05:58.829Z",
    notas: "Colmena en estado de hibernación"
  ) {
    id
  } 
}
```
```graphql
mutation CrearMuerte {
  createMuerte(
    colmenaId: 3,
    tareaId: 6,
    fecha: "2023-08-21T20:05:58.829Z",
    notas: "Registro de muerte en la colmena"
  ) {
    id
  } 
}
```

---

### Serverless & AWS CLI (Próximamente)

- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Installation

To create a new Serverless project.

```bash
$ npm install -g serverless
```

### Usage

To run a function on your local

```bash
$ serverless invoke local --function get
```

To simulate API Gateway locally using [serverless-offline]

```bash
$ serverless offline start
```

Deploy your project

```bash
$ serverless deploy --aws-profile {profile}
```

Deploy a single function

```bash
$ serverless deploy function --function get
```

#### Environment Variables

To add environment variables to your project

1. Add environment variables for your local stage to `.env`.
2. Uncomment `environment:` block in the `serverless.yml` and reference the environment variable as `${env:MY_ENV_VAR}`. Where `MY_ENV_VAR` is added to your `.env` file.
3. Make sure to not commit your `.env`.

