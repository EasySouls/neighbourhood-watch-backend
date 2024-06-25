# Neighbourhood Watch Backend

## Description

This is the backend for the application [Neighbourhood Watch](https://github.com/EasySouls/neighbourhood-watch) written in React Native.

## Installation

```bash
$ yarn install
```

You should also start up the Postgres database with the following command:
```bash
$ docker compose up -d
```

And update the database's schema and generate the Prisma Client:
```bash
$ yarn prisma db pull
$ yarn db:generate
```

## Running the app

```bash
# development
$ yarn start:dev 

# debug
$ yarn start:debug

# production
$ yarn build
$ yarn start:prod

```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
