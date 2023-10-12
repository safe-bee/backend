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



## Comandos de nuestra api de GraphQl

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
    datos_numero_deeps
    datos_numero_supers
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
    alertas {
      id
      descripcion
      tipo_tarea
      terminada
    }
    tareas {
      id
      fecha
      colmenaId
      alertaId
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
    datos_numero_deeps
    datos_numero_supers
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
    alertas {
      id
      descripcion
      tipo_tarea
      terminada
    }
    tareas {
      id
      fecha
      colmenaId
      alertaId
    }
  }
}
```

```graphql
mutation {
  createColmena(
    nombre: "Nueva Colmena"
    apiarioId: 2
    tipo: TOPBAR
    datos_numero_deeps: "2"
    datos_numero_supers: "3"
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
    datos_numero_deeps
    datos_numero_supers
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
  updateColmena(
    id: 1
    nombre: "Colmena Editada"
    apiarioId: 2
    tipo: TOPBAR
    datos_numero_deeps: "2"
    datos_numero_supers: "3"
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
    datos_numero_deeps
    datos_numero_supers
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
    datos_numero_deeps
    datos_numero_supers
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


### Alertas

```graphql
query Alertas{
  alertas {
    id
    descripcion
    fecha
    colmenaId
    terminada
    tipo_tarea
  }
}
```

```graphql
query Alerta{
  alerta(id: 1) {
    id
    descripcion
    fecha
    colmenaId
    terminada
    tipo_tarea
  }
}
```

```graphql
mutation CreateAlerta{
  createAlerta(
    descripcion: "Nueva alerta"
    fecha: "2023-08-21T20:05:58.829Z"
    colmenaId: 1
    tipo_tarea: TRATAMIENTO
    terminada: false
  ) {
    id
    descripcion
    fecha
    colmenaId
    terminada
    tipo_tarea
  }
}
```

```graphql
mutation UpdateAlerta{
  updateAlerta(
    id: 1
    descripcion: "Alerta actualizada"
    fecha: "2024-08-21T20:05:58.829Z"
    colmenaId: 2
    tipo_tarea: COSECHA
    terminada: true
  ) {
    id
    descripcion
    fecha
    colmenaId
    terminada
    tipo_tarea
  }
}
```

```graphql
mutation DeleteAlerta{
  deleteAlerta(id: 1) {
    id
    descripcion
    fecha
    colmenaId
    terminada
    tipo_tarea
  }
}
```


### Tareas
```graphql
query Tareas {
  tareas {
    id
    fecha
    colmenaId
    alertaId
    colmena {
      id
      nombre
    }
    alerta {
      id
      descripcion
      terminada
      tipo_tarea
    }
  }
}
```

```graphql
query Tarea {
  tarea(id: 1) {
    id
    fecha
    colmenaId
    alertaId
    colmena {
      id
      nombre
    }
    alerta {
      id
      descripcion
      terminada
      tipo_tarea
    }
  }
}
```

```graphql
mutation CreateTarea {
  createTarea(
    fecha: "2023-08-30T12:00:00Z"
    alertaId: 2
    colmenaId: 1
  ) {
    id
    fecha
    colmenaId
    alertaId
  }
}
```

```graphql
mutation UpdateTarea {
  updateTarea(
    id: 1
    colmenaId: 2
    alertaId: 2
  ) {
    id
    fecha
    colmenaId
    alertaId
  }
}
```

```graphql
mutation DeleteTarea {
  deleteTarea(id: 1) {
    id
    fecha
    colmenaId
    alertaId
  }
}
```


---

(esta parte vino con el readme ↓)

### Requirements

- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Installation

To create a new Serverless project.

```bash
$ npm install -g serverless
```

Change directories to backend

```bash
$ cd ez-trainer/backend
```

Switch to the `develop` branch.

```bash
git checkout develop
```

Install the npm packages

```bash
$ npm install
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

#### Set up the database

The database for this application runs in the PostgreSQL container.
The database port `4000` is being mapped to your machine's port `4000` so our application is able to communicate with its database via `localhost`.

Run migrations:

```bash
npm run migrate
```

Run seeders:

```bash
npm run seed
```

#### Environment Variables

To add environment variables to your project

1. Add environment variables for your local stage to `.env`.
2. Uncomment `environment:` block in the `serverless.yml` and reference the environment variable as `${env:MY_ENV_VAR}`. Where `MY_ENV_VAR` is added to your `.env` file.
3. Make sure to not commit your `.env`.

