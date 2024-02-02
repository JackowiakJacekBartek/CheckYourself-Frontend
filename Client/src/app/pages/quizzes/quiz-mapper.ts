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

    static mapToQuizRegisterDto(quizData: QuizData, currentJobOfferId: number, totalQuizScore: number): QuizDto {
      return {
        quiz: {
          name: quizData.quizName,
          totalscore: totalQuizScore,
          totaltime: quizData.maxDuration.toString(),
          idcompany: currentJobOfferId,
          type: Number(quizData.quizTechnologyType) || 0,
          passingthreshold: quizData.passingThreshold,
          technology: quizData.quizTechnology,
          description: quizData.quizDescription,
          technologytype: Number(quizData.quizTechnologyType) || 0
        },
        quizzesQuestions: quizData.questions.map(question => ({
          id: question.id,
          question: question.questionContent,
          additionaltext: null,
          type: QuizzesTypes['single-choice'],
          totalscore: 0,
          image: null,
          idquiz: 0,
          totaltime: null
        })),
        quizzesAnswers: quizData.questions.flatMap((question, i) => {

          const correctAnswersArray = question.correctAnswers as CorrectAnswerData[];
          const falseAnswersArray = question.falseAnswers as FalseAnswerData[];

          const questionId = question.id

          const correctAnswers = correctAnswersArray.map((answer, i) => ({
            id: questionId,
            answer: answer.correctAnswer,
            image: null,
            idaccount: localStorage.getItem('userID') !== "undefined" ? Number(localStorage.getItem('userID')) : 0,
            idquestion: answer.idquestion,
            idquiz: 0,
            elapsedtime: null,
            Idquizzesanswer: 0,
            iscorrect: 1,
            additionaltext: null,
            totalscore: answer.correctAnswerScore
          }));
          const falseAnswers = falseAnswersArray.map((falseAnswer, i) => ({
            id: questionId, // Use the question id here
            answer: falseAnswer.falseAnswer,
            image: null,
            idaccount: localStorage.getItem('userID') !== "undefined" ? Number(localStorage.getItem('userID')) : 0,
            idquestion: falseAnswer.idquestion,
            idquiz: 0,
            elapsedtime: null,
            Idquizzesanswer: 0,
            iscorrect: 0,
            additionaltext: null
          }));

          return [...correctAnswers, ...falseAnswers];
        }),
      };
    }

  }
