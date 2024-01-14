drop view if exists JobCompaniesView;
drop table if exists JobApplications;
drop table if exists JobDetails;
drop table if exists JobTechnologies;
drop table if exists JobAdvertisements;
drop table if exists CompanyOffices;
drop table if exists CompanySocialMediaLinks;
drop table if exists CompanyImages;
drop table if exists CompanyTechnologies;
drop table if exists Companies;


create table Companies
(
	id serial primary key,
	logo text,
	nip text not null,
	name text not null,
	headquarterAddress text,
	description text,
	employeeCount int,
	idAccount int not null,
	companyEstablishment timestamp
);

create table CompanyTechnologies
(
	id serial primary key,
	idTechnology int not null, -- 1- technologies html css, 2 - tools jenkins, git, 3 - platforms windows, linux
	name text not null,
	idCompany int references Companies(id) not null
);

create table CompanyImages
(
	id serial primary key,
	name text,
	image text not null, 
	idCompany int references Companies(id) not null
);

create table CompanySocialMediaLinks
(
	id serial primary key,
	idSocialMediaLink int not null,
	name text not null not null, -- Ig/Fb/GitHub
	link text not null, -- pelen link
	idCompany int references Companies(id) not null
);

create table CompanyOffices
(
	id serial primary key,
	location text,
	iframeUrl text,
	idCompany int references Companies(id) not null
);

create table JobAdvertisements
(
	id serial primary key,
	name text not null,
	publicId text,
	image text,
	description text not null,
	employmentMethod int not null,
	employmentType int not null,
	expirationDate timestamp,
	salaryMin double precision,
	salaryMax double precision,
	quizId int,
	companyId int references Companies(Id) not null
);

create table JobTechnologies
(
	id serial primary key,
	idTechnology int not null, -- 1- technologies html css, 2 - tools jenkins, git, 3 - platforms windows, linux, 4 - języki
	icon text not null,
	description text,
	idJobAdvertisements int references JobAdvertisements(id) not null
);

create table JobDetails
(
	id serial primary key,
	idDetail int not null, -- 1 - Główne zadania, 2 - Co szczególnie cenimy w kandydacie, 3 - Organizacja pracy, 4 - benefity
	name text not null, -- dla idDetail 1 programowanie, dla 2 krytyczne myslenie
	idJobAdvertisements int references JobAdvertisements(id) not null
);

create table JobApplications
(
	id serial primary key,
	idAccount int not null, -- 1 - Główne zadania, 2 - Co szczególnie cenimy w kandydacie, 3 - Organizacja pracy, 4 - benefity
	name text,
	cv text,
	idJobAdvertisements int references JobAdvertisements(id) not null
);

-- create tabxle EmployerReviews
-- (
-- 	id serial primary key,
-- 	name text not null,
-- 	rating int not null,
-- 	companyId int references Companies(id),
-- 	accountId int not null
-- );

CREATE OR REPLACE VIEW JobCompaniesView AS
SELECT
    job.id AS id,
    job.name AS jobName,
    job.publicId AS jobPublicId,
    job.image AS jobImage,
    job.description AS jobDescription,
    job.employmentMethod AS jobEmploymentMethod,
    job.employmentType AS jobEmploymentType,
    job.expirationDate AS jobExpirationDate,
    job.salaryMin AS jobSalaryMin,
    job.salaryMax AS jobSalaryMax,
    job.quizId AS jobQuizId,
    job.companyId AS jobCompanyId,
    com.id AS companyId,
    com.logo AS companyLogo,
    com.nip AS companyNip,
    com.name AS companyName,
    com.headquarterAddress AS companyHeadquarterAddress,
    com.description AS companyDescription,
    com.employeeCount AS companyEmployeeCount,
    com.idAccount AS companyIdAccount,
    com.companyEstablishment AS companyEstablishment
FROM
    JobAdvertisements job
JOIN
    Companies com ON job.companyId = com.id;

select * from JobCompaniesView;
select companyid, * from JobAdvertisements;
select name, headquarterAddress, * from companies;
select * from JobCompaniesView;
