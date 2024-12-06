import { validate } from 'class-validator';
import { CreateRainReportDto } from './create-rain-report.dto';

const USER_ID = '604bac992c524da18165a6acbaacf7ba';

describe('CreateRainReportDto', () => {
  let createRainReportDto: CreateRainReportDto;

  beforeEach(() => {
    createRainReportDto = new CreateRainReportDto();
  });

  it('should validate when it is raining', async () => {
    createRainReportDto.rain = true;
    createRainReportDto.userId = USER_ID;

    const errors = await validate(createRainReportDto);

    expect(errors.length).toBe(0);
  });

  it('should validate when it is not raining', async () => {
    createRainReportDto.rain = false;
    createRainReportDto.userId = USER_ID;

    const errors = await validate(createRainReportDto);

    expect(errors.length).toBe(0);
  });

  it('should not validate when all fields are undefined', async () => {
    const errors = await validate(createRainReportDto);

    expect(errors.length).toBe(2);

    expect(errors[0].constraints).toStrictEqual({
      isBoolean: 'rain must be a boolean value',
    });

    expect(errors[1].constraints).toStrictEqual({
      isNotEmpty: 'userId should not be empty',
      isString: 'userId must be a string',
    });
  });

  it('should not validate when `rain` has an incorrect type', async () => {
    // @ts-expect-error -- testing invalid type
    createRainReportDto.rain = 'NOT_VALID';
    createRainReportDto.userId = USER_ID;

    const errors = await validate(createRainReportDto);

    expect(errors.length).toBe(1);

    expect(errors[0].constraints).toStrictEqual({
      isBoolean: 'rain must be a boolean value',
    });
  });

  it('should not validate when `rain` is undefined', async () => {
    createRainReportDto.userId = USER_ID;

    const errors = await validate(createRainReportDto);

    expect(errors.length).toBe(1);

    expect(errors[0].constraints).toStrictEqual({
      isBoolean: 'rain must be a boolean value',
    });
  });

  it('should not validate when `userId` has an incorrect type', async () => {
    // @ts-expect-error -- testing invalid type
    createRainReportDto.userId = false;
    createRainReportDto.rain = true;

    const errors = await validate(createRainReportDto);

    expect(errors.length).toBe(1);

    expect(errors[0].constraints).toStrictEqual({
      isString: 'userId must be a string',
    });
  });

  it('should not validate when `userId` is an empty string', async () => {
    createRainReportDto.userId = '';
    createRainReportDto.rain = true;

    const errors = await validate(createRainReportDto);

    expect(errors.length).toBe(1);

    expect(errors[0].constraints).toStrictEqual({
      isNotEmpty: 'userId should not be empty',
    });
  });

  it('should not validate when `userId` is undefined', async () => {
    createRainReportDto.rain = true;

    const errors = await validate(createRainReportDto);

    expect(errors.length).toBe(1);

    expect(errors[0].constraints).toStrictEqual({
      isNotEmpty: 'userId should not be empty',
      isString: 'userId must be a string',
    });
  });
});
