mysqldump --no-create-info -uroot -p ocbl auth_user > user.sql

ALTER TABLE app  ADD UNIQUE (url);