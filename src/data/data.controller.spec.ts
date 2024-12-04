import { Test, TestingModule } from '@nestjs/testing';
import { DataController } from './data.controller';

describe('DataController', () => {
  let dataController: DataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
    }).compile();

    dataController = module.get<DataController>(DataController);
  });

  describe('root', () => {
    it('should be implemented"', () => {
      expect(dataController.list()).toBeDefined();
    });
  });
});
