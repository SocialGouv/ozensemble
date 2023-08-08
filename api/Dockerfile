FROM node:16-alpine3.18@sha256:82bcf77a5de631c6b19f4449ccec82bfbb7d8f6c94d6ae3bdf760ed67e080cb1

WORKDIR /app

RUN chown node:node /app
RUN chmod 1777 /tmp

USER 1000

COPY package.json .
COPY yarn.lock .

RUN yarn --production --frozen-lockfile && yarn cache clean

COPY . .

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
