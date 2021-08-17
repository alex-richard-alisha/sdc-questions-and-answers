FROM node:14

WORKDIR /src

COPY src /src

COPY .gitignore /src

COPY .eslintrc.js /src

COPY .prettierrc.js /src

COPY jest.config.js /src

COPY package.json /src

COPY package-lock.json /src

COPY tsconfig.json /src

COPY README.json /src

RUN npm install

EXPOSE 1234

CMD npm run start