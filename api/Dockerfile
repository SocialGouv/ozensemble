FROM node:18-bullseye@sha256:f27e3f4c8b5719cb9816084475d687a283c59149f3d11a7aa45b675fea56bed0 AS node

WORKDIR /app

RUN chown node:node /app && chmod 1777 /tmp

USER 1000

FROM node AS builder
COPY yarn.lock .yarnrc.yml ./
COPY --chown=1000:1000 .yarn .yarn
RUN yarn fetch --immutable

COPY --chown=1000:1000 . .
RUN yarn build
RUN yarn workspaces focus --production && yarn cache clean

FROM node AS server
COPY --from=builder /app .

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
