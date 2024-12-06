import { IsBoolean } from 'class-validator';

export class CreateRainReportDto {
  @IsBoolean()
  rain: boolean;
}
