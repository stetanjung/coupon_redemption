FROM node:18-alpine 

WORKDIR /fe-admin

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD yarn run dev
