import { QuizDto, QuizQuestionDto } from "src/app/shared/models/quizzes";

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
  }
  