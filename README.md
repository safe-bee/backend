# Backend

## Setup para correr el proyecto localmente
1. Duplicar el archivo `.env.example` y renombrarlo `.env`
2. Crear una base de datos Postgres con address:port = localhost:5432
3. Modificar la variable `DATABASE_URL` con tu USER, PASSWORD y DBNAME de Postgres
4. Tirar el comando `npx prisma db push` para crear o actualizar las tablas en base a schema.prisma
5. Levantar los seeders: `npx prisma db seed`



## Comandos de nuestra api de GraphQl

### Apiarios:

```graphql
query Apiarios {
  apiarios {
    id,
    nombre,
    latitud,
    longitud,
    direccion,
    tipo_terreno,
    tipo_ambiente
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
    tipo_terreno,
    tipo_ambiente,
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
    tipo_terreno: CAMPO,
    tipo_ambiente: RURAL
  ) {
    id
    nombre
    latitud
    longitud
    direccion
    tipo_terreno
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
    tipo_terreno: OTRO,
    tipo_ambiente: URBANO
  ) {
    id
    nombre
    latitud
    longitud
    direccion
    tipo_terreno
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
    tipo_terreno
    tipo_ambiente
  }
}
```

```graphql
query Colmenas {
    colmenas {
    id
    nombre
    apiarioId
    tipo
  }
}
```

```graphql
mutation {
  createColmena(
      nombre: "Colmena A",
      apiarioId: 1,
      tipo: LANGSTROTH,
      datos_numero_deeps: "2",
      datos_numero_supers: "3"
  ) {
    id nombre tipo
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

