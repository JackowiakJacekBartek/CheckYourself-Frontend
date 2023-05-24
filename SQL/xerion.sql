drop view if exists AccountRoles;
drop table if exists PushTokens;
drop table if exists ResetPassword;
drop table if exists FailedLoginAttempts;
drop table if exists UserExtraData;
drop table if exists Accounts;
drop table if exists WorkSchedule;
drop table if exists EmploymentTypes;
drop table if exists Roles;
drop table if exists EmailsRegister;



create table EmailsRegister
(
	id serial primary key,
	email text not null,
	verificationCode int,
	isVerified bool default false
);

create table Roles
(
	id serial primary key,
	name text
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

create table Accounts -- pracodawca/pracownik, poziom znanych języków
(
	id serial primary key not null,
	email text not null unique,
	name text,
	surname text,
	phoneNumber text,
	birthDate timestamp,
	idEmploymentType int references EmploymentTypes(id),
	idWorkSchedule int references workSchedule(id),
	password text not null,
	verificationCode int,
	verificationCodeValid timestamp,
	idRole int references roles(id) default 1,
	emailConfirmed bool default false,
	allowsNotifications bool default false,
	image text,
	refreshToken text,
	refreshTokenValid timestamp,
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
	createdat timestamp not null default now()
);

create table ResetPassword
(
	id serial primary key,
	createdAt timestamp not null default now(),
	email text not null,
	verificationCode int not null
);

create table PushTokens
(
	id serial primary key,
	idAccount int references Accounts(id) not null,
	token text not null,
	createdat timestamp not null default now()
);

create or replace view AccountRoles as
select Accounts.id, Accounts.name, Accounts.surname, Accounts.email, Accounts.password, Accounts.emailConfirmed, 
Accounts.refreshToken , Roles.name as RoleName, Accounts.refreshTokenValid, Accounts.allowsNotifications 
from Accounts
join Roles on Roles.id = Accounts.idRole;
