import { Injectable } from '@nestjs/common';
import { RainReport } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RainReportService {
  /**
   * Retrieve all `RainReport` records from the database.
   */
  async all(): Promise<RainReport[]> {
    // TODO: create a service and inject
    const database = new PrismaClient();
    try {
      return await database.rainReport.findMany();
    } finally {
      await database.$disconnect();
    }
  }
}
