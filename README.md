<div align="center">
  <h1>Violetit - Woovi Challenge</h1>
  <a href="https://github.com/nogw/violetit">
    <img src="https://i.imgur.com/Hl1oAIO.png" alt="Logo" height="50%" width="50%">
  </a>
  <p align="center">
    Violetit is a Reddit clone
    <br />
    <a href="https://violetit.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/nogw/violetit/issues">Report Bug</a>
  </p>
</div>

> **_NOTE:_** Some scripts of this project have been written based on Unix commands (e.g, cp, rm), so if you are running this project on a Windows-based system, you may face difficulties with the `yarn copy-envs` command. In this case, you can manually copy the `.env.example` files and rename them to `.env`

# Table of contents

- [Project Archicteture](#project-archicteture)
- [Stack](#stack)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Developer environment](#developer-environment)
  - [Copy environment files](#copy-environment-files)
  - [Fill environment files](#fill-environment-files)
  - [Install the dependencies](#install-the-dependencies)
  - [Running server](#running-server)
  - [Running web](#running-web)
  - [Run both web and server packages](#run-both--web--and--server--packages)
- [Contributing](#contributing)
- [References](#references)
- [Contact](#contact)

## Project Archicteture

```
├── apps/
|   └── server
|   └── web
|   └── next #wip
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

## Getting Started

### Installation

Clone the repo

```
git clone https://github.com/nogw/violetit.git
```

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

### Update path to schema

```
### apps/web/relay.config.js
schema: '../server/graphql/schema.graphql',
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

## Contributing

Contributions are welcome from everyone! Here's how you can get started:

### Issues

If you encounter any bugs or have any feature requests, please create an issue with a description of the problem

### Pull Requests

Pull requests from anyone are appreciated and can help make this project better! To get started, follow these steps:

1. Fork the repository
2. Clone the repository to your local machine
3. Create a new branch for your changes and switch to it (`git checkout -b feature/featureName`)
4. Make your changes and commit them (`git commit -m 'Add some featureName'`)
5. Push your changes to your fork (`git push origin feature/featureName`)
6. Create a pull request in the original repository

## References

- [Awesome Woovi Challenge](https://github.com/entria/awesome-woovi-challenge)
- [Relay Workshop](https://github.com/sibelius/relay-workshop)
- [Fakeddit](https://github.com/noghartt/fakeddit)
- [RBFA GraphQL API](https://github.com/daniloab/rbaf-graphql-api)
- [Relay Real World](https://github.com/sibelius/relay-realworld)

## Contact

- Twitter - [@nogchou](https://twitter.com/nogchou)
- Discord - noge#4932

[Back To The Top](#violetit)
