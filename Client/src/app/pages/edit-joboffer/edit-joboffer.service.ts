import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ReturnedResponse} from "../../shared/models/returned-response";
import {UserProfile} from "../../shared/models/accounts";
import {comapniesUrl, jobsUrl, localUrl} from "../../shared/constants/constants";
import {HttpClient} from "@angular/common/http";
import {JobOffer, JobOfferGet} from "../../shared/models/jobOffer";

@Injectable({
  providedIn: 'root'
})
export class EditJobofferService {

  constructor(private http: HttpClient) { }

  private get controller() {
    return "api/Job"
  }

  public getJobsByIdCompany(id: number): Observable<ReturnedResponse<JobOfferGet[]>> {
    return this.http.get<ReturnedResponse<JobOfferGet[]>>(`${jobsUrl}/${this.controller}/get-jobs-by-idCompany?idCompany=${id}`);
  }

  public getJobById(id: number): Observable<ReturnedResponse<JobOffer>> {
    return this.http.get<ReturnedResponse<JobOffer>>(`${jobsUrl}/${this.controller}/get-job-by-id?id=${id}`);
  }

  public createJob(model: JobOffer): Observable<ReturnedResponse<JobOffer>> {
    return this.http.post<ReturnedResponse<JobOffer>>(`${jobsUrl}/${this.controller}/create`, model);
  }

  public deleteJob(id: number): Observable<ReturnedResponse<JobOffer>> {
    return this.http.delete<ReturnedResponse<JobOffer>>(`${jobsUrl}/${this.controller}/delete-job-by-id?jobId=${id}`);
  }
}
