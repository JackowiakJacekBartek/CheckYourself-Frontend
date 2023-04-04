drop table if exists EmployeeReviews;
drop table if exists EmployerReviews;
drop table if exists JobAdvertisementsDetails;
drop table if exists JobAdvertisementsData;
drop table if exists JobAdvertisementsParameters;
drop table if exists JobAdvertisements;
drop table if exists NamespaceParameters;
drop table if exists ParametersTypesNames;
drop table if exists Companies;

create table Companies
(
	id serial primary key,
	name text not null,
	description text not null
	-- accountId..
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

-- create table EmployerReviews
-- (
-- 	id serial primary key,
-- 	name text not null,
-- 	rating int not null,
-- 	companyId int references Companies(id),
-- 	accountId int not null
-- );
