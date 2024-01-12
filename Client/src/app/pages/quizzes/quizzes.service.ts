import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReturnedResponse} from "../../shared/models/returned-response";
import { quizzesUrl } from 'src/app/shared/constants/constants';
import { QuizDto } from 'src/app/shared/models/quizzes';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private http: HttpClient) { }

  getQuizByIdJobAdvertisement(idJobAdvertisement: number): Observable<ReturnedResponse<QuizDto>> {
    return this.http.get<ReturnedResponse<QuizDto>>(quizzesUrl + `/get-quiz-by-idJobAdvertisement?idJobAdvertisement=${idJobAdvertisement}`);
  }

  sendQuizResults(result: any): Observable<ReturnedResponse<QuizDto>> {
    return this.http.get<ReturnedResponse<QuizDto>>(quizzesUrl + `/send-results`);
  }

}
