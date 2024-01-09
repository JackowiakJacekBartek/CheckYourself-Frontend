drop table if exists QuizzesParticipants;
drop table if exists QuizzesAnswers;
drop table if exists QuizzesQuestions;
drop table if exists Quizzes;

create table Quizzes
(
	id serial primary key,
	image text,
	name text not null,
	description text,
	idCompany int not null,
	type int not null --1 - jednokrotnego, 2 - wielokrotnego
);

create table QuizzesQuestions
(
	id serial primary key,
	question text not null,
	image text,
	idQuiz int references Quizzes(id) not null
);

create table QuizzesAnswers
(
	id serial primary key,
	answer text,
	image text,
	idQuiz int references Quizzes(id) not null
);

create table QuizzesResults
(
	id serial primary key,
	idAccount int not null,
	score int not null,
	idQuiz int references Quizzes(id) not null
);
