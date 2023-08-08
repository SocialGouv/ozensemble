FROM node:18-bullseye@sha256:f27e3f4c8b5719cb9816084475d687a283c59149f3d11a7aa45b675fea56bed0

WORKDIR /app

RUN chown node:node /app
RUN chmod 1777 /tmp

USER 1000

COPY . .

RUN yarn --production --frozen-lockfile && yarn cache clean

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
