FROM node:16-alpine

WORKDIR /app

RUN chown node:node /app

COPY api/package.json .
COPY api/yarn.lock .
RUN yarn --production --frozen-lockfile

COPY api/prisma .
COPY api/. .

RUN npx prisma migrate deploy
RUN npx prisma generate


USER 1000

ENV NODE_ENV=production


ENTRYPOINT ["yarn", "start"]
