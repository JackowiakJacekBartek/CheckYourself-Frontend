drop table if exists QuizzesResults;
drop table if exists QuizzesAttempts;
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
	passingThreshold float not null,
	totalTime text, -- "05:00"
	idCompany int not null,
	technology text not null, -- .Net / Java / React / JS
	type int not null -- 1 - jednokrotnego, 2 - wielokrotnego
);

create table QuizzesQuestions
(
	id serial primary key,
	question text not null,
	additionalText text,
	type int not null, -- single / multi choice
	totalScore float not null,
	totalTime text,
	image text,
	idQuiz int references Quizzes(id) not null
);

create table QuizzesAnswers
(
	id serial primary key,
	answer text not null,
	additionalText text,
	isCorrect int not null,
	image text,
	totalScore float not null,
	totalTime text,
	idQuestion int references QuizzesQuestions(id) not null,
	idQuiz int references Quizzes(id) not null
);

create table QuizzesAttempts
(
	id serial primary key,
	totalElapsedTime text,
	totalParticipantScore float,
	idAccount int not null,
	idQuiz int references Quizzes(id) not null
);

create table QuizzesResults
(
	id serial primary key,
	idAccount int not null,
	score float not null,
	elapsedTime text,
	answer text not null,
	idQuizzesAnswer int references QuizzesAnswers(id) not null,
	idQuiz int references Quizzes(id) not null,
	idQuizzesAttempt int references QuizzesAttempts(id) not null
);

select * from Quizzes;
select * from QuizzesQuestions;
select * from QuizzesAnswers where iscorrect=1;
select * from QuizzesResults;
select * from QuizzesAttempts;