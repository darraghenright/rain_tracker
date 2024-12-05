import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { seedDatabase, SEED_DATA } from './utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    await seedDatabase();
  });

  it('GET / should return status `501 Not Implemented`', async () => {
    // route automatically uses the global `/api` prefix
    await request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.NOT_IMPLEMENTED);
  });

  it('GET /api/data should return a list of data`', async () => {
    // ensure data is in descending order by `timestamp`
    const orderedSeedData = SEED_DATA.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
    );

    const expectedBody = JSON.parse(JSON.stringify(orderedSeedData));
    const expectedLength = SEED_DATA.length;

    // route automatically uses the global `/api` prefix
    await request(app.getHttpServer())
      .get('/data')
      .expect(HttpStatus.OK)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body).toHaveLength(expectedLength);
        expect(res.body).toEqual(expectedBody);
      });
  });
});
