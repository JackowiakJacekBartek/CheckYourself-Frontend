drop table if exists Professions;
drop table if exists Frameworks;
drop table if exists ProgrammingLanguages;
drop table if exists ProgrammingLanguageCategories;
drop table if exists ProgrammingTools;
drop table if exists Environments;
drop table if exists ForeignLanguages;
drop table if exists Hobbies;
drop table if exists SoftSkills;
drop table if exists Cities;
drop table if exists Countries;
drop table if exists Tags;
drop table if exists Certificates;



create table Certificates
(
	id serial primary key,
	name text not null,
	serialNumber text,
	obtainingDate timestamp not null,
	expirationDate timestamp
);

create table Tags
(
	id serial primary key,
	name text not null
);

create table Countries
(
	id serial primary key,
	name text not null
);

create table Cities
(
	id serial primary key,
	name text not null,
	idCountry int references Countries(id)
);

create table SoftSkills
(
	id serial primary key,
	name text not null
);

create table Hobbies
(
	id serial primary key,
	name text not null
);

create table ForeignLanguages -- eng, pl, de
(
	id serial primary key,
	name text not null,
	idCountry int references Countries(id)
);

create table Environments -- windows, linux
(
	id serial primary key,
	name text not null
);

create table ProgrammingTools -- git, jira
(
	id serial primary key,
	name text not null
);

create table ProgrammingLanguageCategories -- back,front
(
	id serial primary key,
	name text not null
);

create table ProgrammingLanguages -- c#,java
(
	id serial primary key,
	name text not null
);

create table Frameworks -- react, angular
(
	id serial primary key,
	name text not null,
	idCategory int references ProgrammingLanguageCategories(id),
	idProgrammingLanguage int references ProgrammingLanguages(id)
);

create table Professions -- programmer, analyst
(
	id serial primary key,
	name text not null
);
