FROM node

WORKDIR /sdc/src/app

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

EXPOSE 1337

CMD [ "node", "index.js" ]