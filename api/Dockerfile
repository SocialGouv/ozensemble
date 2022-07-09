FROM node:16-alpine

WORKDIR /app

RUN chown node:node /app

COPY . .

RUN yarn --production --frozen-lockfile

RUN chown -R /app/node_modules/.prisma node:node

USER node

ENV NODE_ENV=production

RUN npx prisma generate
RUN npx prisma migrate deploy

ENTRYPOINT ["yarn", "start"]
