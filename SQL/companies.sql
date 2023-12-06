drop view if exists AccountCompaniesView;
drop table if exists EmployerReviews;
drop table if exists JobAdvertisementsDetails;
drop table if exists JobAdvertisementsData;
drop table if exists JobAdvertisementsParameters;
drop table if exists JobAdvertisements;
drop table if exists NamespaceParameters;
drop table if exists CompanyOffices;
drop table if exists ParametersTypesNames;
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
	idAccount int not null
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

create table ParametersTypesNames
(
	id serial primary key,
	name text not null, -- rodzaj umowy, wymiar etatu itd.
	type text not null -- text / datetime
);

create table NamespaceParameters
(
	id serial primary key,
	parametersTypesNamesId int references ParametersTypesNames(id),
	-- type text not null,
	affiliation int not null -- 6/7/8.. elementów
);

create table JobAdvertisements
(
	id serial primary key,
	name text not null,
	-- type text not null,
	publicId text,
	affiliation text not null, -- 6/7/8.. elementów
	companyId int references Companies(Id),
	namespaceParametersId int references NamespaceParameters(id)
);

create table JobAdvertisementsParameters
(
	id serial primary key,
	namespaceParametersId int references NamespaceParameters(id),
	jobAdvertisementsId int references JobAdvertisements(id),
	content text not null -- UOP/Specjalista/Praca stacjonarna
);

create table JobAdvertisementsData
(
	id serial primary key,
	namespaceParametersId int references NamespaceParameters(id),
	jobAdvertisementsId int references JobAdvertisements(id),
	jobAdvertisementsParametersId int references JobAdvertisementsParameters(id),
	companiesId int references Companies(id),
	content text not null -- more important than JobAdvertisementsParameters
);

create table JobAdvertisementsDetails
(
	id serial primary key,
	entry text not null,
	queue int not null,
	metadata text,
	affiliation int not null, -- 1zakres obowiązków, 2wymagania, 3benefity, 4Proces rekrutacyjny
	jobAdvertisementsId int references JobAdvertisements(id)
);

-- create tabxle EmployerReviews
-- (
-- 	id serial primary key,
-- 	name text not null,
-- 	rating int not null,
-- 	companyId int references Companies(id),
-- 	accountId int not null
-- );

-- CREATE OR REPLACE VIEW AccountCompaniesView AS
-- SELECT
--     acc.id AS id,
--     acc.email,
--     acc.phoneNumber,
--     acc.description,
--     acc.birthDate,
--     acc.isCompany,
--     acc.image,
--     com.id AS companyId,
--     com.nip,
--     com.name AS companyName,
-- 	com.location
-- FROM
--     Accounts acc
-- JOIN
--     Companies com ON acc.id = com.idAccount;
