FROM node:18-alpine 

WORKDIR /fe-public

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD yarn run dev
