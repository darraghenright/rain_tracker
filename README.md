# Rain Tracker

## Description

An API to track and report on rainfall. Build with [NestJS](https://nestjs.com/) and TypeScript.

## Development

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

### Up and running

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
