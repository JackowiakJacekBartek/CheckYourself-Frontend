import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { comapniesUrl } from 'src/app/shared/constants/constants';
import { ReturnedResponse } from 'src/app/shared/models/returned-response';
import { JobsQuickInfo } from 'src/app/shared/models/jobOffer';

@Injectable({
  providedIn: 'root'
})
export class QuizzesListService {

  constructor(private http: HttpClient) { }

  private get controller() {
    return "api/Job"
  }

  getJobOffers(): Observable<ReturnedResponse<JobsQuickInfo[]>> {
    return this.http.get<ReturnedResponse<JobsQuickInfo[]>>(comapniesUrl + `/api/Job/get-jobs-by-idaccount?id=`+localStorage.getItem('userID'));
  }
  
  deleteJobOffer(id:number): Observable<ReturnedResponse<number>> {
    return this.http.delete<ReturnedResponse<number>>(comapniesUrl + `/api/Job/delete-job-by-id?jobId=`+ id);
  }
}
