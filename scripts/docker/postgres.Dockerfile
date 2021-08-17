FROM postgres:latest

RUN mkdir /seed/
COPY ./data/*.csv /seed/

RUN chmod a+rx /seed

COPY buildTables.sql /docker-entrypoint-initdb.d