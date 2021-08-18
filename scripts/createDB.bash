dropdb 'questions_and_answers'
createdb 'questions_and_answers'
psql questions_and_answers
psql -d questions_and_answers -a -f ./src/db/buildTables.sql
