FROM node:16-alpine

WORKDIR /app

RUN chown node:node /app
RUN chown -R node_modules/.prisma node:node

COPY . .

RUN yarn --production --frozen-lockfile


USER node

ENV NODE_ENV=production

RUN npx prisma generate
RUN npx prisma migrate deploy

ENTRYPOINT ["yarn", "start"]
