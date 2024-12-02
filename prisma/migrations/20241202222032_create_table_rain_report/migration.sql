-- CreateTable
CREATE TABLE "rain_report" (
    "id" SERIAL NOT NULL,
    "rain" BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rain_report_pkey" PRIMARY KEY ("id")
);
