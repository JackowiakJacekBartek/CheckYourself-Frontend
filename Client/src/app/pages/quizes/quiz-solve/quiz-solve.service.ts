import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountLogin, AccountRegister } from 'src/app/shared/models/accounts';
import { ReturnedResponse } from 'src/app/shared/models/returned-response';
import { localUrl } from 'src/app/shared/constants/constants';

@Injectable({ providedIn: 'root' })
export class LoginRegisterService {
    
    constructor(private http: HttpClient) { }

    private get controller() {
        return "api/Account"
    }

    Register(model: AccountRegister): Observable<ReturnedResponse<AccountRegister>> {
        return this.http.post<ReturnedResponse<AccountRegister>>(`${localUrl}/${this.controller}/register`, model);
    }
}
