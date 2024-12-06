import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRainReportDto {
  @IsBoolean()
  rain: boolean;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
