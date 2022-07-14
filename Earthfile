VERSION 0.6
FROM node:16.14.0-buster-slim
WORKDIR /workspace

all:
    BUILD +build
    BUILD +e2e-test

deps:
    COPY package.json package-lock.json .
    RUN npm install
    SAVE ARTIFACT package-lock.json AS LOCAL ./package-lock.json
    SAVE ARTIFACT node_modules /node_modules

lint:
    FROM +deps
    COPY .eslintrc.json .eslintrc.json
    COPY src src
    RUN npm run lint

unit-test:
    FROM +deps
    COPY vitest.config.ts vitest.config.ts
    COPY --dir test fixture .
    COPY src src
    RUN npm run coverage
    SAVE ARTIFACT coverage /coverage AS LOCAL ./coverage

build:
    BUILD +lint
    BUILD +unit-test
    FROM +deps
    COPY webpack.config.js tsconfig.json tsconfig.webpack.json .
    COPY src src
    RUN npm run build
    SAVE ARTIFACT dist /dist AS LOCAL ./dist

e2e-test:
    FROM mcr.microsoft.com/playwright:v1.23.0-focal
    WORKDIR /workspace
    COPY +deps/node_modules node_modules
    COPY package.json playwright.config.ts .
    RUN npx playwright install --with-deps chromium
    COPY --dir e2e fixture .
    COPY +build/dist dist
    RUN npm run e2e
