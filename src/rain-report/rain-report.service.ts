import { Injectable } from '@nestjs/common';
import { RainReport } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RainReportService {
  /**
   * Retrieve all `RainReport` records from the database.
   */
  async all(): Promise<RainReport[]> {
    const prismaClient = new PrismaClient();
    try {
      return await prismaClient.rainReport.findMany();
    } finally {
      await prismaClient.$disconnect();
    }
  }
}
