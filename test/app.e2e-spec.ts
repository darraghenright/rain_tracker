import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('GET /api should return status `501 Not Implemented`', async () => {
    // route automatically uses the global `/api` prefix
    await request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.NOT_IMPLEMENTED)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((response) => {
        expect(response.body).toStrictEqual({
          message: 'Not Implemented',
          statusCode: 501,
        });
      });
  });
});
