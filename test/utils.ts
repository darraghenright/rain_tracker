import { PrismaClient } from '@prisma/client';

export const SEED_DATA = [
  {
    rain: true,
    timestamp: new Date('2024-12-04T00:00:00Z'),
  },
  {
    rain: false,
    timestamp: new Date('2024-12-04T12:00:00Z'),
  },
];

export async function seedDatabase() {
  const database = new PrismaClient();

  await database.$executeRaw`TRUNCATE TABLE "rain_report" CASCADE`;
  await database.rainReport.createMany({ data: SEED_DATA });
}
