import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, empty } from 'rxjs';
import { map } from 'rxjs/operators';
import { localUrl } from '../constants/constants';
import { AccountLogin, AccountLoginSuccess, User } from '../models/accounts';
import { ReturnedResponse } from '../models/returned-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
    baseUrl = localUrl;

    constructor(private http: HttpClient, private route: Router) {}

    private get controller() {
        return 'api/Account';
    }

    public login(
        model: AccountLogin
    ): Observable<ReturnedResponse<AccountLoginSuccess>> {
        return this.http
        .post<ReturnedResponse<AccountLogin>>(
            `${localUrl}/${this.controller}/login`,
            model
        )
        .pipe(
            map((response: any) => {
            const user = response;
            if (user) {
                this.setCurrentUser(user.methodResult);
            }
            return response;
            })
        );
    }

    public register(model: any) {
        return this.http
        .post<ReturnedResponse<AccountLogin>>(
            `${localUrl}/${this.controller}/register`,
            model
        )
    }

    public setCurrentUser(user: AccountLoginSuccess) {
        localStorage.setItem('userID', `${user.id}`);
        localStorage.setItem('accessToken', `${user.accessToken}`);
        localStorage.setItem('refreshToken', `${user.refreshtoken}`);
    }

    public logout() {
        localStorage.removeItem('userID')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        this.route.navigateByUrl('/');
    }
}
