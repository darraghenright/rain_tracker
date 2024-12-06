import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/rain-report/database.service';
import { seedDatabase, SEED_DATA, USER_ID } from './utils';

describe('RainReportController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        transform: true,
        whitelist: true,
      }),
    );

    await app.init();
    await seedDatabase();
  });

  it('GET /api/data should return a list of data`', async () => {
    // ensure data is in descending order by `timestamp`
    // ensure `Date` objects are cast to strings
    const orderedSeedData = SEED_DATA.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
    ).map(({ rain, timestamp }) => ({
      rain,
      timestamp: timestamp.toISOString(),
    }));

    // expected response body and data count
    const expectedBody = { data: orderedSeedData };
    const expectedLength = SEED_DATA.length;

    // route automatically uses the global `/api` prefix
    await request(app.getHttpServer())
      .get('/data')
      .expect(HttpStatus.OK)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((response) => {
        expect(response.body).toStrictEqual(expectedBody);
        expect(response.body.data.length).toStrictEqual(expectedLength);
      });
  });

  it('POST /api/data should create a new rain report', async () => {
    // ensure `rain_report` table is empty
    const database = new DatabaseService();
    await database.$executeRaw`TRUNCATE TABLE rain_report RESTART IDENTITY`;

    // fake the current datetime
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-12-06T00:00:00.000Z'));

    // expected response body
    const expectedBody = {
      data: {
        id: 1,
        rain: true,
        timestamp: '2024-12-06T00:00:00.000Z',
      },
    };

    // route automatically uses the global `/api` prefix
    await request(app.getHttpServer())
      .post('/data')
      .send({ rain: true, userId: USER_ID })
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((response) => {
        expect(response.body).toStrictEqual(expectedBody);
      });
  });

  it('POST /api/data should not create a new rain report for missing payload', async () => {
    // route automatically uses the global `/api` prefix
    await request(app.getHttpServer())
      .post('/data')
      .expect(HttpStatus.BAD_REQUEST)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((response) => {
        expect(response.body).toStrictEqual({
          error: 'Bad Request',
          message: [
            'rain must be a boolean value',
            'userId should not be empty',
            'userId must be a string',
          ],
          statusCode: 400,
        });
      });
  });

  it('POST /api/data should not create a new rain report if `rain` is missing', async () => {
    // route automatically uses the global `/api` prefix
    await request(app.getHttpServer())
      .post('/data')
      .send({ userId: USER_ID })
      .expect(HttpStatus.BAD_REQUEST)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((response) => {
        expect(response.body).toStrictEqual({
          error: 'Bad Request',
          message: ['rain must be a boolean value'],
          statusCode: 400,
        });
      });
  });

  it('POST /api/data should not create a new rain report if `userId` is missing', async () => {
    // route automatically uses the global `/api` prefix
    await request(app.getHttpServer())
      .post('/data')
      .send({ rain: true })
      .expect(HttpStatus.BAD_REQUEST)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((response) => {
        expect(response.body).toStrictEqual({
          error: 'Bad Request',
          message: ['userId should not be empty', 'userId must be a string'],
          statusCode: 400,
        });
      });
  });

  it('POST /api/data should not allow extra fields', async () => {
    // route automatically uses the global `/api` prefix
    await request(app.getHttpServer())
      .post('/data')
      .send({ rain: true, extra: 'NOT_VALID', userId: USER_ID })
      .expect(HttpStatus.BAD_REQUEST)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((response) => {
        expect(response.body).toStrictEqual({
          error: 'Bad Request',
          message: ['property extra should not exist'],
          statusCode: 400,
        });
      });
  });
});
