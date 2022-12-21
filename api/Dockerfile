FROM node:16-alpine3.16

WORKDIR /app

RUN chown node:node /app

USER 1000

COPY . .

RUN yarn --production --frozen-lockfile

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
