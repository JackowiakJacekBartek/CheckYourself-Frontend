import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { quizzesUrl } from 'src/app/shared/constants/constants';
import { QuizDto, QuizResultDto } from 'src/app/shared/models/quizzes';
import { ReturnedResponse } from 'src/app/shared/models/returned-response';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }
  userId: string | null = localStorage.getItem('userID');

  getQuizAttemptResultById(id: number): Observable<ReturnedResponse<QuizResultDto>> {
    return this.http.get<ReturnedResponse<QuizResultDto>>(quizzesUrl + `/get-results?quizAttemptId=${id}&idAccount=${this.userId}`);
  }

  // getUserQuizzesAttempts(id: number): Observable<ReturnedResponse<QuizDto>> {
  //   return this.http.get<ReturnedResponse<QuizDto>>(quizzesUrl + `/get-quiz-by-idJobAdvertisement?idJobAdvertisement=${idJobAdvertisement}`);
  // }

}
