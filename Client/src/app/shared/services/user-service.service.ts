import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, empty } from 'rxjs';
import { map } from 'rxjs/operators';
import { localUrl } from '../constants/constants';
import { AccountLogin, AccountLoginSuccess, User } from '../models/accounts';
import { ReturnedResponse } from '../models/returned-response';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
    baseUrl = localUrl;
    private currentUserSource = new ReplaySubject<User | null>(1);
    currentUser$ = this.currentUserSource.asObservable();

    constructor(private http: HttpClient) {}

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
                this.setCurrentUser(user);
            }
            return response;
            })
        );
    }

    public guardCheck() {
        console.log("he he")
        this.currentUser$.subscribe(res => {
            if (res) {
                console.log(true)
            } else {
                console.log(false)
            }
        })
    }

    public register(model: any) {
        return this.http
        .post<ReturnedResponse<AccountLogin>>(
            `${localUrl}/${this.controller}/register`,
            model
        )
        .pipe(
            map((user: any) => {
            if (user) {
                this.setCurrentUser(user);
            }
            return user;
            })
        );
    }

    public setCurrentUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
    }

    public logout() {
        localStorage.removeItem('user');
        this.currentUserSource.next(null);
    }
}
