FROM node

WORKDIR /app

RUN npm install -g nodemon

COPY package.json .

RUN npm install

COPY . .

ENV PORT=5000

ENV MONGO_URL=

EXPOSE 5000

CMD [ "npm", "start" ]