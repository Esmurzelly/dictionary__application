FROM node:18.12.0-alpine

WORKDIR /app/dictionaryApp

COPY ./package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]