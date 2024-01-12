import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { quizzesUrl } from 'src/app/shared/constants/constants';
import { QuizDto } from 'src/app/shared/models/quizzes';
import { ReturnedResponse } from 'src/app/shared/models/returned-response';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  getQuizResultById(id: number): Observable<ReturnedResponse<QuizDto>> {
    return this.http.get<ReturnedResponse<QuizDto>>(quizzesUrl + `/get-quiz-by-idJobAdvertisement?idJobAdvertisement=${id}`);
  }

  // getUserQuizResultList(id: number): Observable<ReturnedResponse<QuizDto>> {
  //   return this.http.get<ReturnedResponse<QuizDto>>(quizzesUrl + `/get-quiz-by-idJobAdvertisement?idJobAdvertisement=${idJobAdvertisement}`);
  // }

}
