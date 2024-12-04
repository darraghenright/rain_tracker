import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { HttpStatus } from '@nestjs/common';
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('/api', () => {
    it('should return `501 Not Implemented`"', () => {
      try {
        appController.index();
      } catch (error) {
        expect(error.status).toBe(HttpStatus.NOT_IMPLEMENTED);
      }
    });
  });
});
