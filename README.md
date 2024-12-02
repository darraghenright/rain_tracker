# rain_tracker

## Description

WIP. An API to track and report on rainfall.

## Prerequisites

The following tools are required to run the project:

* [Docker](https://www.docker.com/) with [Docker Compose](https://docs.docker.com/compose/install/)
* [Node.js](https://nodejs.org/en/download/package-manager)


## Up and running

Clone the repository:

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

Remove Docker services. This will stop and delete all docker containers and remove PostgreSQL data:

```shell
make down
```

## Development

Install the [Nest CLI](https://docs.nestjs.com/cli/overview#installation):

```shell
npm install -g @nestjs/cli
```
