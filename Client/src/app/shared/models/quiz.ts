export interface QuizModel {
    technology: string,
    title: string,
    questions: QuizQuestionsModel[]
}

export interface QuizQuestionsModel {
    type: string,
    code?: string,
    picture?: string,
    film?: string,
    question?: string, // out na Options
    answers?: QuizAnswers // out na Options
    sentences?: Options[]
}

export interface Options {
    question: string,
    answers: QuizAnswers
}

export interface QuizAnswers {
    correct: string[],
    incorrect: string[]
}

export interface QuizSentences {
    sentences: Options[]
}

export interface QuizMatches {
    matches: Options[]
}
