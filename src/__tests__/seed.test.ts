import { PrismaClient } from '@prisma/client';
import { main as seedDatabase } from '../../prisma/seed';  // Asegúrate de exportar 'main' en tu archivo seed.ts

describe('Database Seeding', () => {
  let prisma: PrismaClient;

  // Ejecutar antes de todas las pruebas
  beforeAll(async () => {
    // Reiniciar la base de datos y correr seeders
    prisma = new PrismaClient();
    await seedDatabase();
  });

  // Ejecutar después de todas las pruebas
  afterAll(async () => {
    await prisma.$disconnect();
  });

  // Test para Apiarios
  it('should seed Apiarios correctly', async () => {
    const apiarios = await prisma.apiario.findMany();
    expect(apiarios).toBeTruthy();  // Comprueba si se han sembrado datos
  });

  // Test para Zonas Óptimas
  it('should seed Zonas Óptimas correctly', async () => {
    const zonas = await prisma.zona.findMany();
    expect(zonas).toBeTruthy();
  });


});
