# System Design Capstone

## Overview

The backend for an online clothing shop.

### Installation

This project requires an environment an installation of `PostGreSQL`, as well as an instantiated database `questions_and_answers`.

In order to seed the database, first run `npm seed`.

In order to run this project, first run `npm install` from the root directory. Then start the server using `npm start`.

### Docker

In order to run using Docker, one must first have Docker installed and running.

Then, run `docker compose build postgres` (the name of the relevant Dockerfile). This will cause Docker to run all of the instructions specified in order to create an image.

After the image is built, then run `docker compose run postgres`.

If a rebuild is required, one must first stop any containers associated with the image in question. Then, those containers must be removed (`docker container rm <container_name>`), and then the image can be removed (`docker image rm <image_name>`). Before a build can be reattempted, the cache should first be cleared (`docker builder prune`).

After an image is built for both node and postgres (using the approach listed above), run `docker compose up`. This will mount all images defined in the compose file.

If you get in too deep, use `docker system prune` to clear things out. Similarly, when faced with too many redundant images, use `docker image prune -a`.

### Technologies

<!-- Nodejs -->
<img align="center" alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node-dot-js&logoColor=white"/>

<!-- express -->
<img align="center" alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>

<!--  postgresql -->
<img align="center" alt="Postgres" src ="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>

<!--  typescript -->
<img align="center" alt="TypeScript" src ="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>

<!--  eslint -->
<img align="center" alt="Eslint" src ="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white"/>
