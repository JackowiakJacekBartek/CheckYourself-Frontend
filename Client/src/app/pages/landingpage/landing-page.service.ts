import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnedResponse } from 'src/app/shared/models/returned-response';
import { localUrl } from 'src/app/shared/constants/constants';

@Injectable({ providedIn: 'root' })
export class LandingPageService {
    
    constructor(private http: HttpClient) { }

    private get controller() {
        return "api/Account"
    }

    verifyEmail(model: EmailVerification): Observable<ReturnedResponse<EmailVerification>> {
        console.log(model)
        return this.http.post<ReturnedResponse<EmailVerification>>(`${localUrl}/${this.controller}/confirm-email`, model);
    }
}

export interface EmailVerification {
    email: string,
    code: number
  }