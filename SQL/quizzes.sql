drop table if exists QuizzesResults;
drop table if exists QuizzesAnswers;
drop table if exists QuizzesQuestions;
drop table if exists Quizzes;

create table Quizzes
(
	id serial primary key,
	image text,
	name text not null,
	description text,
	totalScore float,
	idCompany int not null,
	technology text not null, -- .Net / Java / React / JS
	type int not null -- 1 - jednokrotnego, 2 - wielokrotnego
);

create table QuizzesQuestions
(
	id serial primary key,
	question text not null,
	additionalText text,
	type int not null,
	totalScore float not null,
	image text,
	idQuiz int references Quizzes(id) not null
);

create table QuizzesAnswers
(
	id serial primary key,
	answer text not null,
	isCorrect int not null,
	image text,
	idAccount int not null,
	idQuestion int references QuizzesQuestions(id) not null,
	idQuiz int references Quizzes(id) not null
);

create table QuizzesResults
(
	id serial primary key,
	idAccount int not null,
	score float not null,
	idQuiz int references Quizzes(id) not null
);
