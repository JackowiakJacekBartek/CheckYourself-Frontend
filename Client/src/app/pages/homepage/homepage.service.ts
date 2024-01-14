import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReturnedResponse} from "../../shared/models/returned-response";
import {UserProfile} from "../../shared/models/accounts";
import {CompanyProfile} from "../../shared/models/companies";
import { comapniesUrl } from 'src/app/shared/constants/constants';
import { Job, JobsQuickInfo } from 'src/app/shared/models/jobOffer';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  getJobs(): Observable<ReturnedResponse<JobsQuickInfo[]>> {
    return this.http.get<ReturnedResponse<JobsQuickInfo[]>>(comapniesUrl + `/api/Job/get-jobs`);
  }

}
