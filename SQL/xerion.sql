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
drop table if exists AccountSoftSkills;
drop table if exists AccountSoftSkillsTitles;
drop table if exists AccountTags;
drop table if exists AccountTechnicalSkills;
drop table if exists AccountSocialMediaLinks;
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

create table Accounts
(
	id serial primary key not null,
	email text not null unique,
	title text,
	name text,
	surname text,
	phoneNumber text,
	description text,
	birthDate timestamp,
	-- idEmploymentType int references EmploymentTypes(id),
	-- idWorkSchedule int references workSchedule(id),
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
	lastModificationDate timestamp default now(), -- stworzyc archiwalna tabele
	salaryMin double precision,
	salaryMax double precision,
	location text,
	employmentMethod int,
	employmentType int
);

create table AccountSocialMediaLinks
(
	id serial primary key,
	idSocialMediaLink int not null,
	name text not null not null, -- Ig/Fb/GitHub
	link text not null, -- pelen link
	idAccount int references Accounts(id) not null
);

create table AccountTechnicalSkills
(
	id serial primary key,
	name text not null, --HTML, CSS, C#
	progress double precision default 0.00, -- %
	idAccount int references Accounts(id) not null
);

-- create table AccountTechnicalSkillTypes -- front/back/tools
-- (
-- 	id serial primary key,
-- );

create table AccountTags
(
	id serial primary key,
	info text,
	idTag int,
	idAccount int references Accounts(id) not null,
	createdAt timestamp default now()
);

create table AccountSoftSkillsTitles
(
	id serial primary key,
	name text not null,
	icon text,
	createdAt timestamp default now()
);

create table AccountSoftSkills
(
	id serial primary key,
	idAccountSoftSkillsTitle int references AccountSoftSkillsTitles(id),
	name text not null,
	idAccount int references Accounts(id) not null,
	createdAt timestamp default now()
);

create table AccountCoursesCertificates
(
	id serial primary key,
	idCertificate int not null, --references Certificates(id) not null, 
	certificateNumber text not null, -- TODO!
	idAccount int references Accounts(id) not null,
	idOrganizationIssuingCertificate int not null,
	certificateIssueDate timestamp not null,
	expirationDate timestamp,
	certificateName text not null, -- dirty
	OrganizationIssuingCertificate text not null, -- dirty
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
	professionName text not null, -- dirty
	universityName text not null, -- dirty
	professionalTitle text not null, -- dirty
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
	idProfession int not null, --references Professions(id) not null
	idWorkCompany int not null, -- TODO!
	idAccount int references Accounts(id) not null,
	dateStart timestamp not null,
	dateEnd timestamp,
	workCompany text not null, -- dirty
	profession text,
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
