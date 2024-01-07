import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReturnedResponse} from "../../shared/models/returned-response";
import {UserProfile} from "../../shared/models/accounts";
import {CompanyProfile} from "../../shared/models/companies";
import { comapniesUrl } from 'src/app/shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CompanyPageService {

  constructor(private http: HttpClient) { }

  private get controller() {
    return "api/Company"
  }

  getCompanyById(companyId: number): Observable<ReturnedResponse<CompanyProfile>> {
    return this.http.get<ReturnedResponse<CompanyProfile>>(comapniesUrl + `/api/Company/get-company-by-id?id=`+companyId);
  }

  getCompaniesByIdAccount(idAccount: number): Observable<ReturnedResponse<CompanyProfile>> {
    return this.http.get<ReturnedResponse<CompanyProfile>>(comapniesUrl + `/api/Company/get-companies-by-idAccount?id=`+idAccount);
  }

}
