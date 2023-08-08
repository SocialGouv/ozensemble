FROM node:18-bullseye-slim@sha256:7e264f54d45f6f93b1625a273afec9c389b9cf0e355b08a34d06b94972bef95c

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
