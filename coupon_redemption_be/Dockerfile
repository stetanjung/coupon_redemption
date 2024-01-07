FROM node:18-alpine

WORKDIR /server

COPY package*.json ./
COPY . .

RUN yarn install
RUN yarn build

ENV TZ=Asia/Shanghai

CMD ["sh", "-c", "yarn prisma:dev:deploy && yarn run start:prod"]
