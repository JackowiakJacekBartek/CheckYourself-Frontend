import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReturnedResponse} from "../../shared/models/returned-response";
import {UserProfile} from "../../shared/models/accounts";
import {CompanyProfile} from "../../shared/models/companies";
import { comapniesUrl } from 'src/app/shared/constants/constants';
import { Job } from 'src/app/shared/models/job';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  user = {
    email:`test@example.com`
  }

  constructor(private http: HttpClient) { }

  getJobs(): Observable<ReturnedResponse<Job[]>> {
    return this.http.get<ReturnedResponse<Job[]>>(comapniesUrl + `/api/Job/get-jobs`);
  }

}
