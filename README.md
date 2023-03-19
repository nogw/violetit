# Violetit

> **_NOTE:_** Some scripts of this project have been written based on Unix commands (e.g, cp, rm), so if you are running this project on a Windows-based system, you may face difficulties with the `yarn copy-envs` command. In this case, you can manually copy the `.env.example` files and rename them to `.env`

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
- [ ] Dockerfile
- [ ] CI/CD (Github Actions)

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

#### > Web

- [x] TypeScript
- [x] ReactTS
- [x] Vite
- [x] Semantic UI
- [x] Tailwind
- [x] Linter (Eslint)
- [x] Prettier
- [x] react-router-dom
- [ ] Storybook
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

```sh
### apps/server/.env
PORT=4000
JWT_KEY=
MONGO_URI=
```

```sh
### apps/web/.env
VITE_GRAPHQL_URL=
```

### Install the dependencies

```sh
yarn
```

### Running server

Generate the `schema.graphql`:

```sh
yarn workspace @violetit/server schema:generate
```

Start the server in development mode:

```sh
yarn workspace @violetit/server start:dev
```

### Running web

Generate the types from `relay-compiler`

```sh
yarn workspace @violetit/web relay
```

Start the web app in development mode:

```sh
yarn workspace @violetit/web start:dev
```

### Run both `web` and `server` packages

```bash
yarn dev:all
```

## References

- [Awesome Woovi Challenge](https://github.com/entria/awesome-woovi-challenge)
- [Relay Workshop](https://github.com/sibelius/relay-workshop)
- [Fakeddit](https://github.com/noghartt/fakeddit)
- [RBFA GraphQL API](https://github.com/daniloab/rbaf-graphql-api)
- [Relay Real World](https://github.com/sibelius/relay-realworld)
