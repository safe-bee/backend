# Backend

## (esta parte de propia)

### Setup para que ande este proyecto
- Duplicar el archivo `.env.example` y renombrarlo `.env`
- Modificar el `DATABASE_URL` con tu usuario y contraseña de postgres 
- Comando para tirar los seeders: `npx prisma db seed`


### Comandos de nuestra api de GraphQl

Apiarios:
```
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

