-- CREATE table students(sid INTEGER NOT NULL PRIMARY KEY, sname TEXT NOT NULL, 
-- smail TEXT NOT NULL);
-- drop table students;
-- insert into students values(3,'cam','cam23@gmail.com');
-- select * from students;

select smail from students where sname LIKE "c%m";
