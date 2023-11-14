import { ApolloServer } from "@apollo/server";
import { PrismaClient } from '@prisma/client'
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from "./schema/index.js";
import cron from 'node-cron';
import { procesarInformacionParaTratamientoDeVarroa } from './xd.js';


interface MyContext {
  prisma: PrismaClient
}

const server = new ApolloServer<MyContext>(schema);


const { url } = await startStandaloneServer(
  server, 
  {
    context: async ({ res, req }) => ({
      prisma: new PrismaClient()
    }),
    listen: { port: 4000 },
  }
);

cron.schedule("00 00 30 06 *", function () {
  // Esta tarea corre los 30 de Junio a las 00:00
  procesarInformacionParaTratamientoDeVarroa(new PrismaClient(), 1)
});


console.log(`🚀  Server ready at ${url}`);

