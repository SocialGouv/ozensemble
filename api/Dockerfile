FROM node:16-alpine

WORKDIR /app

RUN chown node:node /app

USER 1000

COPY . .

RUN yarn --production --frozen-lockfile

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
