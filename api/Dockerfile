FROM node:18-alpine3.18@sha256:4b31ab14f7fba2525846ee313182fe937fd8ab47271399c37fe89f1d1e7a8760

WORKDIR /app

RUN chown node:node /app

USER 1000

COPY package.json .
COPY yarn.lock .

RUN yarn --production --frozen-lockfile && yarn cache clean

COPY . .

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
