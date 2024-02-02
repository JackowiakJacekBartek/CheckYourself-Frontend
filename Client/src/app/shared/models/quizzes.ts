export interface QuizDto {
    quiz: QuizModelDto;
    quizzesAnswers: QuizzesAnswerDto[];
    quizzesQuestions: QuizzesQuestionDto[];
}

export interface QuizModelDto {
    id?: number;
    image?: string | null;
    name: string;
    description?: string | null;
    idcompany: number;
    type: number;
    totalscore?: number | null;
    totaltime?: string | null;
    passingthreshold: number;
    technology: string;
    technologytype?: number;
}

export interface QuizzesAnswerDto {
    id?: number,
    answer: string;
    image?: string | null;
    isCorrect?: number;
    idaccount: number;
    idquestion: number;
    idquiz: number;
    elapsedtime?: string | null;
    Idquizzesanswer: number;
}

export interface QuizzesQuestionDto {
    id?: number;
    question: string;
    additionaltext?: string | null;
    type: number;
    totalscore: number;
    image?: string | null;
    idquiz: number;
    totaltime?: string | null;
}

export interface QuizQuestionDto {
    question: QuizzesQuestionDto;
    answers: QuizzesAnswerDto[]
}

export interface QuizAnswerDto {
    question: QuizzesQuestionDto;
    answers: QuizzesAnswerDto[]
}

export interface QuizzesResultDto {
    id?: number;
    idaccount: number;
    idquiz: number;
    idquestion: number;
    answer: string;
    elapsedtime?: string | null;
    idquizzesanswer: number;
}

export interface QuizAttemptDto {
    id: number;
    totalelapsedtime: string;
    totalparticipantscore: number;
    idaccount: number;
    idquiz: number;
}

export interface QuizResultDto {
    quiz: QuizModelDto;
    quizAttempt: QuizAttemptDto;
}



// NEW

export interface QuizData {
    quizName: string;
    maxDuration: string;
    maxPoints: number;
    questions: QuestionData[];
    quizDescription: string;
    passingThreshold: number;
    quizTechnology: string;
    quizTechnologyType: string;
}

export interface QuestionData {
    id: number;
    questionContent: string;
    correctAnswers: CorrectAnswerData[];
    falseAnswers: FalseAnswerData[];
}

export interface CorrectAnswerData {
    correctAnswer: string;
    correctAnswerScore: number;
    idquestion: number;
}

export interface FalseAnswerData {
    falseAnswer: string;
    idquestion: number;
}

