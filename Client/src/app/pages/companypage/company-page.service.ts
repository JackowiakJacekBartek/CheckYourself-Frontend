import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReturnedResponse} from "../../shared/models/returned-response";
import {UserProfile} from "../../shared/models/accounts";
import {CompanyProfile} from "../../shared/models/companies";

@Injectable({
  providedIn: 'root'
})
export class CompanyPageService {

  constructor(private http: HttpClient) { }

  private get controller() {
    return "api/Company"
  }

  getCompanyById(id: number): Observable<ReturnedResponse<CompanyProfile>> {
    return this.http.get<ReturnedResponse<CompanyProfile>>(`http://192.168.1.114:5013/api/Company/get-company-by-id?id=1`);
  }

}
