# Violetit - Woovi Challenge

> **_NOTE:_** Some scripts of this project have been written based on Unix commands (e.g, cp, rm), so if you are running this project on a Windows-based system, you may face difficulties with the `yarn copy-envs` command. In this case, you can manually copy the `.env.example` files and rename them to `.env`

# Table of contents

- [Project Archicteture](#project-archicteture)
- [How to run](#how-to-run)
  - [Environment](#developer-environment)
  - [Dependencies](#install-the-dependencies)
  - [Run server](#running-server)
  - [Run web](#running-web)
  - [Run project](#run-both-web-and-server-packages)
- [References](#references)
- [Author Info](#author-info)

## Project Archicteture

```
├── apps/
|   └── server
|   └── web
├── packages/
|   └── babel
|   └── types
|   └── ui
└── ...
```

### Stack

#### > Root

- [x] Linter (Eslint)
- [x] Prettier
- [x] Commitlint
- [x] Editorconfig
- [x] Lint staged
- [x] Pre-commit
- [x] CI/CD (Github Actions)
- [ ] Dockerfile

#### > Server

- [x] TypeScript
- [x] Koa
- [x] GraphQL
- [x] Relay
- [x] MongoDB
- [x] Mongoose
- [x] Jest
- [x] Linter (Eslint)
- [x] Prettier
- [x] Entria helpers
- [x] Webpack + Babel

#### > Web

- [x] TypeScript
- [x] ReactTS
- [x] Vite
- [x] Semantic UI
- [x] Tailwind
- [x] Linter (Eslint)
- [x] Prettier
- [x] Routing (react-router-dom)
- [ ] Jest + Testing Library

## How to run

### Developer environment

#### Setup Docker + MongoDB

```sh
### remember to start docker before executing the command!
docker run -d -p 27017:27017 --name CONTAINER_NAME -d mongo:latest
```

### Copy environment files

```sh
yarn copy-envs
```

### Fill environment files

`MONGO_URI` can be set as `mongodb://127.0.0.1:27017/violetit` if you run in localhost

```sh
### apps/server/.env
PORT=4000
JWT_KEY=
MONGO_URI=
```

`VITE_GRAPHQL_URL` can be set as `http://localhost:4000/graphql` if you run in localhost

```sh
### apps/web/.env
VITE_GRAPHQL_URL=
```

### Install the dependencies

```sh
yarn
```

### Running server

To begin, generate the `schema.graphql` file:

```sh
yarn workspace @violetit/server schema:generate
```

Start the server in development mode:

```sh
yarn workspace @violetit/server start:dev
```

### Running web

To begin, generate the artifacts using the Relay Compiler:

```sh
yarn workspace @violetit/web relay
```

Start the web app in development mode:

```sh
yarn workspace @violetit/web start:dev
```

### Run both `web` and `server` packages

If you have completed the necessary setup for the required packages, you can run them concurrently with a single command:

```bash
yarn dev:all
```

## References

- [Awesome Woovi Challenge](https://github.com/entria/awesome-woovi-challenge)
- [Relay Workshop](https://github.com/sibelius/relay-workshop)
- [Fakeddit](https://github.com/noghartt/fakeddit)
- [RBFA GraphQL API](https://github.com/daniloab/rbaf-graphql-api)
- [Relay Real World](https://github.com/sibelius/relay-realworld)

## Author Info

- Follow me on [Twitter](https://twitter.com/nogchou)

[Back To The Top](#violetit)
