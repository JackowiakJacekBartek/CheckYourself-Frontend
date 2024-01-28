import { QuizzesTypes } from "src/app/shared/constants/constants";
import { CorrectAnswerData, FalseAnswerData, QuizData, QuizDto, QuizQuestionDto } from "src/app/shared/models/quizzes";

export class QuizMapper {
    static mapToQuestionsWithAnswers(quizDto: QuizDto): QuizQuestionDto[] {
      return quizDto.quizzesQuestions.map((question) => {
        const answers = quizDto.quizzesAnswers
          .filter((answer) => {
            return answer.idquestion === question.id;
          })
  
        return {
          question: question,
          answers: answers,
        };
      });
    }

    static mapToQuizRegisterDto(quizData: QuizData, currentJobOfferId: number): QuizDto {
      return {
        quiz: {
          name: quizData.quizName,
          totalscore: quizData.maxPoints,
          totaltime: quizData.maxDuration.toString(),
          idcompany: currentJobOfferId,
          type: QuizzesTypes['single-choice'],
          passingthreshold: quizData.passingThreshold,
          technology: quizData.quizTechnology,
          description: quizData.quizDescription,
        },
        quizzesAnswers: quizData.questions.flatMap(question => {
          const correctAnswersArray = question.correctAnswers as CorrectAnswerData[];
          const falseAnswersArray = question.falseAnswers as FalseAnswerData[];
          const correctAnswers = correctAnswersArray.map((answer, i) => ({
            id: 0,
            answer: answer.correctAnswer,
            image: null,
            idaccount: localStorage.getItem('userID') === "undefined" ? Number(localStorage.getItem('userID')) : 0,
            idquestion: 0,
            idquiz: 0,
            elapsedtime: null,
            Idquizzesanswer: 0,
            iscorrect: 1,
            additionaltext: null
          }));
          const falseAnswers = falseAnswersArray.map((falseAnswer, i) => ({
            id: 0,
            answer: falseAnswer.falseAnswer,
            image: null,
            idaccount: localStorage.getItem('userID') === "undefined" ? Number(localStorage.getItem('userID')) : 0,
            idquestion: 0,
            idquiz: 0,
            elapsedtime: null,
            Idquizzesanswer: 0,
            iscorrect: 0,
            additionaltext: null
          }));
          return [...correctAnswers, ...falseAnswers];
        }),
        quizzesQuestions: quizData.questions.map(question => ({
          question: question.questionContent,
          additionaltext: null,
          type: QuizzesTypes['single-choice'],
          totalscore: 0,
          image: null,
          idquiz: 0,
          totaltime: null
        }))
      };
    }
  }
  