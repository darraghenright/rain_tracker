import { Test, TestingModule } from '@nestjs/testing';
import { RainReportController } from './rain-report.controller';
import { RainReportService } from './rain-report.service';
import { SEED_DATA, USER_ID } from '../../test/utils';

describe('RainReportController', () => {
  let controller: RainReportController;
  let mockRainReportService: Partial<RainReportService>;

  beforeEach(async () => {
    mockRainReportService = {
      all: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RainReportController],
      providers: [
        {
          provide: RainReportService,
          useValue: mockRainReportService,
        },
      ],
    }).compile();

    controller = module.get<RainReportController>(RainReportController);
  });

  describe('RainReportController.index()', () => {
    it('should call `RainReportService.all()` to retrieve data', async () => {
      (mockRainReportService.all as jest.Mock).mockResolvedValue(SEED_DATA);

      const response = await controller.index();

      expect(mockRainReportService.all).toHaveBeenCalledTimes(1);
      expect(response).toStrictEqual({ data: SEED_DATA });
    });
  });

  describe('RainReportController.create()', () => {
    it('should call `RainReportService.create()` to report that it is raining', async () => {
      await controller.create({ rain: true, userId: USER_ID });

      expect(mockRainReportService.create).toHaveBeenCalledTimes(1);
      expect(mockRainReportService.create).toHaveBeenCalledWith(true, USER_ID);
    });

    it('should call `RainReportService.create()` to report that it is not raining', async () => {
      await controller.create({ rain: false, userId: USER_ID });

      expect(mockRainReportService.create).toHaveBeenCalledTimes(1);
      expect(mockRainReportService.create).toHaveBeenCalledWith(false, USER_ID);
    });
  });
});
