FROM postgres:latest

RUN mkdir /seed/
COPY ./data/src/*.csv /seed/

RUN chmod a+rx /seed

COPY /scripts/docker/buildTables.sql /docker-entrypoint-initdb.d