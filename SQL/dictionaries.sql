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
drop table if exists WorkSchedule;
drop table if exists EmploymentTypes;
drop table if exists SkillsDomain;



create table SkillsDomain
(
	id serial primary key,
	idParent int references SkillsDomain(id),
	domain text not null,
	isFinal int default 1 -- 1: has children, 2: does not have children, 3: can have children but also can be final
);

create table EmploymentTypes -- UoP, UZ
(
	id serial primary key,
	name text
);

create table WorkSchedule -- remote, stationary
(
	id serial primary key,
	name text
);

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
	name text not null,
	color text
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
	idCountry int references Countries(id) -- pomyslimy polska, deutsch, english
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
	-- image
);

-- technologie szczegolowe
create table Frameworks -- react, angular
(
	id serial primary key,
	name text not null,
	-- image
	idCategory int references ProgrammingLanguageCategories(id), -- back/front
	idProgrammingLanguage int references ProgrammingLanguages(id) -- bootstrap?
);

create table Professions -- programmer, analyst
(
	id serial primary key,
	name text not null
);
