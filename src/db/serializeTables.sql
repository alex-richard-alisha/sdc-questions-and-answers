SELECT pg_catalog.setval(pg_get_serial_sequence('qa.questions', 'id'), (SELECT MAX(id) FROM qa.questions)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('qa.answers', 'id'), (SELECT MAX(id) FROM qa.answers)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('qa.qa_photos', 'id'), (SELECT MAX(id) FROM qa.qa_photos)+1);
