# su - postgres
dropdb 'questions_and_answers'
createdb 'questions_and_answers'
psql questions_and_answers
# \i ../src/db/createTables.sql