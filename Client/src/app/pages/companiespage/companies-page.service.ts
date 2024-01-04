import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReturnedResponse} from "../../shared/models/returned-response";
import {UserProfile} from "../../shared/models/accounts";
import {Company, CompanyProfile} from "../../shared/models/companies";
import { comapniesUrl } from 'src/app/shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CompanyPageService {

  constructor(private http: HttpClient) { }

  private get controller() {
    return "api/Company"
  }

  getCompaniesById(): Observable<ReturnedResponse<Company[]>> { // TODO idaccount provide
    return this.http.get<ReturnedResponse<Company[]>>(comapniesUrl + `/api/Company/get-companies-by-idAccount?id=`+localStorage.getItem('userID'));
  }

}
