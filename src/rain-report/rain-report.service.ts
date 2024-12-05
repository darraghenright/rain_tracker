import { Injectable } from '@nestjs/common';
import { RainReport } from '@prisma/client';
import { DatabaseService } from './database.service';

@Injectable()
export class RainReportService {
  constructor(private readonly database: DatabaseService) {}

  /**
   * Retrieve all `RainReport` records from the database.
   */
  async all(): Promise<Partial<RainReport>[]> {
    return await this.database.rainReport.findMany({
      select: { timestamp: true, rain: true },
      orderBy: { timestamp: 'desc' },
    });
  }
}
