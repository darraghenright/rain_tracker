import { validate } from 'class-validator';
import { CreateRainReportDto } from './create-rain-report.dto';

describe('CreateRainReportDto', () => {
  let createRainReportDto: CreateRainReportDto;

  beforeEach(() => {
    createRainReportDto = new CreateRainReportDto();
  });

  it('should validate when it is raining', async () => {
    createRainReportDto.rain = true;
    const errors = await validate(createRainReportDto);
    expect(errors.length).toBe(0);
  });

  it('should validate when it is not raining', async () => {
    createRainReportDto.rain = false;
    const errors = await validate(createRainReportDto);
    expect(errors.length).toBe(0);
  });

  it('should not validate when it is not a boolean', async () => {
    // @ts-expect-error -- testing invalid type
    createRainReportDto.rain = 'true';
    const errors = await validate(createRainReportDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toStrictEqual({
      isBoolean: 'rain must be a boolean value',
    });
  });

  it('should not validate when it is undefined', async () => {
    const errors = await validate(createRainReportDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toStrictEqual({
      isBoolean: 'rain must be a boolean value',
    });
  });
});
