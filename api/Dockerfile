FROM node:16-alpine

WORKDIR /app

RUN chown node:node /app

COPY . .

RUN yarn --production --frozen-lockfile

RUN yarn prisma migrate deploy

USER 1000

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
