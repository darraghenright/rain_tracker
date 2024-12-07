# Rain Tracker

## Introduction

**Rain Tracker** is a small API to create and serve rainfall reports. It is a Node and TypeScript based application, built with [NestJS](https://nestjs.com/) and [Prisma ORM](http://prisma.com), and uses PostgreSQL for data persistence.

## How to run this project

This project can be run as a Docker compose stack. You should have [Docker](https://www.docker.com/) with [Docker Compose](https://docs.docker.com/compose/install/) installed.

First, clone this repository and `cd` into it:

```shell
git clone https://github.com/darraghenright/rain_tracker.git
cd rain_tracker
```

Then, copy `.env.dist` to `.env` and use your favourite editor to edit the `.env` file and add whatever values you prefer. No other configuration setup should be required as the containers will use the values provided. Refer to the comments in this file for more information.

Then run the Docker compose stack:

```shell
docker compose up --build
```

This will run services in the foreground. If you want to run the services in the background then run the following command instead:

```shell
docker compose up --build --detach
```

This will create a Docker compose stack containing:

- The `postgres` service exposed to your host at port `5432`
- The Rain Tracker `api` service exposed to your host at port `3000`

Database migrations should be run automatically which will create the Postgres database structure.

Finally, to stop the project:

```shell
docker compose stop
# or completely remove all containers and stack with `docker compose down`
```

## Features

The API exposes two endpoints for serving and creating `RainReport` records. All requests must contain a valid identity. Refer to the **Identity** section of this README for more information.

### Identity

All valid requests are identified with a custom `x-userid` request header.

This header must be present and contain a non-empty value. If a request does not include a valid `x-userid` header it is rejected with a `401 Unauthorized` response.

In addition to enforcing identity `x-userid` header performs a slightly different function for each endpoint. These will be discussed further in this README.

### OpenAPI documentation

Comprehensive and interactive documentation for this project available as an OpenAPI/Swagger UI and a JSON specification. They are available respectively at:

- http://localhost:3000/
- http://localhost:3000/json

This should provide the canonical and most up to date documentation for this API. A brief summary of functionality follows below.

### List

Fetch all `RainReport` records for a provided identity.

The custom request header `x-userid` must be provided to assert identity. Each newly created `RainReport` persists the `x-userid` header value (saved as `user_id`) in order to track the ownership of each record in the system.

#### Endpoint

`GET /api/data`

#### Request body

N/A

#### Response body

Returns a set of `RainReport` records, where each record contains a subset of the persisted data. The `id` and `user_id` are not included in the response.

```json
{
  "data": [
    {
      "rain": true,
      "timestamp": "2024-12-04T00:00:00Z"
    },
    ...
  ]
}
```

### Create

Create a `RainReport` for a provided identity.

The custom request header `x-userid` must be provided to assert identity. This header provides a basic form of authentication when retrieving existing `RainReport` records. The value of the provided `x-userid` header is used to return only records associated with that value, filtered on the `user_id` column.

Therefore, it is not possible to retrieve `RainReport` records:

- without a valid `x-userid` header
- that are associated with another `x-userid`
- that return an unfiltered query

#### Endpoint

`POST /api/data`

#### Request body

A JSON object stating if it is raining at that moment or not.

```json
{
  "rain": true
}
```

#### Response body

Returns the created `RainReport` record, with a subset of the persisted data. The `user_id` is not included in the response.

```json
{
  "data": {
    "id": 1
    "rain": true,
    "timestamp": "2024-12-04T00:00:00Z"
  }
}
```

## Data model

A PostgreSQL database instance provides persistence. At the application layer it uses Prisma which is an ORM and query interface for creating and fetching data from the database, as well as defining the data model itself. Refer to the file `prisma/schema.prisma` for more information on the data model itself.

The database includes the following tables:

### `_prisma_migrations`

This table is part of Prisma ORM's own functionality and tracks data migration changes over time.

### `rain_report`

This table tracks all `RainReport` records and contains the following columns

- `id` — autoincrementing primary key
- `rain` — `boolean` field to determine if the record tracks a rain event.
- `timestamp` — `datetime` (UTC) field that captures when the record was created.
- `user_id` — `string` field that associates the identity that created the record.

## Development

This section outlines the prerequisites and steps required to set up this project for local development.

### Prerequisites

The following tools are required to run the project:

- [Docker](https://www.docker.com/) with [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/package-manager)

Refer to the `.tool-versions` file in the project root for the preferred Node version to install. If you are using [adsf](https://asdf-vm.com/) you can install this version by running:

```shell
asdf install
```

The [Nest CLI](https://docs.nestjs.com/cli/overview) tool is required to run various commands such as generators during development. This can be installed globally by running:

```shell
npm install -g @nestjs/cli
```

### Setup

Clone this repository:

```shell
git clone https://github.com/darraghenright/rain_tracker.git
```

Copy `.env.dist` to `.env` and update `.env` with your preferred values:

```shell
cp .env{.dist,}
```

Install project dependencies:

```shell
npm install
```

Start Docker services (PostgreSQL) in the background:

```shell
make up
```

Stop Docker services:

```shell
make stop
```

Remove Docker services. This will stop and delete all docker containers and remove all PostgreSQL data:

```shell
make down
```

### Tests

To run specs, run:

```shell
npm run test
# or run tests in watch mode
npm run test:watch
```

To run end-to-end tests, run:

```shell
npm run test:e2e
```
