drop view if exists AccountRoles;
drop table if exists PushTokens;
drop table if exists ResetPassword;
drop table if exists FailedLoginAttempts;
drop table if exists UserExtraData;
drop table if exists AccountWorkResponsibilities;
drop table if exists AccountWorkExperiences;
drop table if exists AccountForeignLanguages;
drop table if exists AccountEducations;
drop table if exists AccountCoursesCertificates;
drop table if exists AccountHobbies;
drop table if exists AccountSoftSkills;
drop table if exists AccountOrganizationsAssociations;
drop table if exists Accounts;
drop table if exists Roles;
drop table if exists EmailsRegister;



create table EmailsRegister
(
	id serial primary key,
	email text not null,
	verificationCode int,
	isVerified bool default false,
	createdAt timestamp default now()
);

create table Roles
(
	id serial primary key,
	name text
);

create table Accounts -- pracodawca/pracownik, poziom znanych języków
(
	id serial primary key not null,
	email text not null unique,
	name text,
	surname text,
	phoneNumber text,
	description text,
	birthDate timestamp,
	-- idEmploymentType int references EmploymentTypes(id),
	--idWorkSchedule int references workSchedule(id),
	password text not null,
	verificationCode int,
	verificationCodeValid timestamp,
	idRole int references Roles(id) default 1,
	emailConfirmed bool default false,
	allowsNotifications bool default false,
	image text,
	refreshToken text,
	refreshTokenValid timestamp,
	createdAt timestamp default now(),
	-- lastModificationDate timestamp default now(), stworzyc archiwalna tabele
	salaryMin double precision,
	salaryMax double precision
);

create table AccountOrganizationsAssociations
(
	id serial primary key,
	name text not null,
	idAccount int references Accounts(id) not null,
	createdAt timestamp default now()
);

create table AccountSoftSkills
(
	id serial primary key,
	name text not null,
	idAccount int references Accounts(id) not null,
	createdAt timestamp default now()
);

create table AccountHobbies
(
	id serial primary key,
	name text not null,
	idAccount int references Accounts(id) not null,
	createdAt timestamp default now()
);

create table AccountCoursesCertificates
(
	id serial primary key,
	idCertificate int not null, --references Professions(id) not null, 
	certificateNumber text not null, -- TODO!
	idAccount int references Accounts(id) not null,
	idOrganizationIssuingCertificate int not null,
	certificateIssueDate timestamp not null,
	expirationDate timestamp,
	createdAt timestamp default now()
);

create table AccountEducations
(
	id serial primary key,
	idProfession int not null, --references Professions(id) not null, 
	idUniversityName int not null, -- TODO!
	idProfessionalTitle int not null, -- TODO!
	idAccount int references Accounts(id) not null,
	dateStart timestamp not null,
	dateEnd timestamp,
	createdAt timestamp default now()
);

create table AccountForeignLanguages
(
	id serial primary key,
	idForeignLanguage int not null,
	idAccount int references Accounts(id) not null,
	level int not null, -- 1:A1, 2:A2, 3:B2, ..., 6: C2
	createdAt timestamp default now()
);

create table AccountWorkExperiences
(
	id serial primary key,
	idProfession int not null, --references Professions(id) not null, czy na pewno? moze lepiej text i chuj z dictionary
	idWorkCompany int not null, -- TODO!
	idAccount int references Accounts(id) not null,
	dateStart timestamp not null,
	dateEnd timestamp,
	createdAt timestamp default now()
);

create table AccountWorkResponsibilities
(
	id serial primary key,
	name text,
	idAccount int references Accounts(id) not null,
	idAccountWorkExperience int references AccountWorkExperiences(id) not null,
	createdAt timestamp default now()
);

create table UserExtraData -- for fb, google, linkedin
(
	id serial primary key,
	idAccount int references Accounts(id),
	token text,
	method text,
	tokenDataJson text,
    origin int not null, -- 1 fb, 2 google, 3 linkedin
	createdat timestamp default now()
);

create table FailedLoginAttempts
(
	id serial primary key,
	idAccount int references Accounts(id) not null,
	kind int not null,
	createdat timestamp default now()
);

create table ResetPassword
(
	id serial primary key,
	email text not null,
	verificationCode int not null,
	createdAt timestamp default now()
);

create table PushTokens
(
	id serial primary key,
	idAccount int references Accounts(id) not null,
	token text not null,
	createdat timestamp default now()
);

create or replace view AccountRoles as
select Accounts.id, Accounts.name, Accounts.surname, Accounts.email, Accounts.password, Accounts.emailConfirmed, 
Accounts.refreshToken , Roles.name as RoleName, Accounts.refreshTokenValid, Accounts.allowsNotifications 
from Accounts
join Roles on Roles.id = Accounts.idRole;
