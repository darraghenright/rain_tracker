import { Injectable } from '@nestjs/common';
import { RainReport } from '@prisma/client';
import { DatabaseService } from './database.service';

type RainReportData = Partial<RainReport>;

@Injectable()
export class RainReportService {
  constructor(private readonly database: DatabaseService) {}

  /**
   * Retrieve all `RainReport` records from the database.
   */
  async all(userId: string): Promise<RainReportData[]> {
    return await this.database.rainReport.findMany({
      select: { rain: true, timestamp: true },
      where: { user_id: userId },
      orderBy: { timestamp: 'desc' },
    });
  }

  /**
   * Create a new `RainReport` record for the current
   * datetime and return the created `RainReport` record.
   */
  async create(isRaining: boolean, userId: string): Promise<RainReportData> {
    return await this.database.rainReport.create({
      data: { rain: isRaining, timestamp: new Date(), user_id: userId },
      select: { id: true, rain: true, timestamp: true },
    });
  }
}
