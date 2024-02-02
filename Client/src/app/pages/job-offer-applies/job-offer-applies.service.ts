import { Component, Injectable } from '@angular/core';
import { Offer } from '../companypage/company-page.component';
import { CompanySocialMediaLinks } from 'src/app/shared/models/companies';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jobsUrl, quizzesUrl } from 'src/app/shared/constants/constants';
import { JobOfferGet } from 'src/app/shared/models/jobOffer';
import { ReturnedResponse } from 'src/app/shared/models/returned-response';
import {JobOfferApplies} from "../../shared/models/jobOfferApplies";

@Injectable({
  providedIn: 'root'
})
export class JobOfferAppliesService {

  constructor(private http: HttpClient) { }

  private get controller() {
    return "api/Quizzes"
  }

  public GetAllResultsForJobAdvertisements(idOffer: number): Observable<ReturnedResponse<JobOfferApplies[]>> {
    return this.http.get<ReturnedResponse<JobOfferApplies[]>>(`${quizzesUrl}/get-all-results-for-job-advertisements?jobOfferId=${idOffer}`);
  }

}
