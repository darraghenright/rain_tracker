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

  it('GET /api should return status `501 Not Implemented`', () => {
    // FIXME: this implicitly recognises the global `/api` prefix
    return request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.NOT_IMPLEMENTED);
  });
});
