import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from 'src/app/_shared/models/accounts';

@Injectable({ providedIn: 'root' })
export class LoginService {
    
    constructor(private http: HttpClient) { }

    Login(): Observable<Account> {
        return this.http.get<Account>('/api/Account/Login');
    }
}
