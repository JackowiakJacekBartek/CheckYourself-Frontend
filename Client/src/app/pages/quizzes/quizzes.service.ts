import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReturnedResponse} from "../../shared/models/returned-response";
import { quizzesUrl } from 'src/app/shared/constants/constants';
import { QuizAnswerDto, QuizDto, QuizzesAnswerDto, QuizzesResultDto } from 'src/app/shared/models/quizzes';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private http: HttpClient) { }

  getQuizByIdJobAdvertisement(idJobAdvertisement: number): Observable<ReturnedResponse<QuizDto>> {
    return this.http.get<ReturnedResponse<QuizDto>>(quizzesUrl + `/get-quiz-by-idJobAdvertisement?idJobAdvertisement=${idJobAdvertisement}`);
  }

  sendQuizResults(results: QuizAnswerDto[], elapsedTime: string): Observable<ReturnedResponse<QuizDto>> {

    const mappedResults: QuizzesResultDto[] = results.flatMap((quizAnswer, index) =>
        quizAnswer.answers.map(answer => ({
        id: answer.id,
        idaccount: Number(localStorage.getItem('userID')),
        idquizzesanswer: Number(answer.id),
        elapsedtime: elapsedTime ?? "00:00",
        idquiz: quizAnswer.question.idquiz,
        answer: answer.answer ?? "",
        idquestion: answer.idquestion
      }))
    );

    return this.http.post<ReturnedResponse<QuizDto>>(quizzesUrl + `/send-results`, mappedResults);
  }

}
