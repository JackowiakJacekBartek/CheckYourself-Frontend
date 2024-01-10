import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnedResponse } from 'src/app/shared/models/returned-response';
import { localUrl } from 'src/app/shared/constants/constants';
import { EmailVerification } from './landing-page.component';

@Injectable({ providedIn: 'root' })
export class EmailVerificationService {
    
    constructor(private http: HttpClient) { }

    private get controller() {
        return "api/Account"
    }

    verifyEmail(model: EmailVerification): Observable<ReturnedResponse<EmailVerification>> {
        console.log(model)
        return this.http.post<ReturnedResponse<EmailVerification>>(`${localUrl}/${this.controller}/confirm-email`, model);
    }
}
