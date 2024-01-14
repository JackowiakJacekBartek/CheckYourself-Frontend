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

  getJobs(phrase?: string, location?: string, count: number = 10): Observable<ReturnedResponse<JobsQuickInfo[]>> {
    const query = `${comapniesUrl}/api/Job/get-jobs?phrase=${phrase || ''}&location=${location || ''}&count=${count}`;

    return this.http.get<ReturnedResponse<JobsQuickInfo[]>>(query);
  }
}
