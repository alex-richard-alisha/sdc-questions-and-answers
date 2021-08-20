FROM node:14

WORKDIR /src

COPY . /src

COPY ./scripts/docker/.env /src

RUN npm install

EXPOSE 3000

CMD npm run start