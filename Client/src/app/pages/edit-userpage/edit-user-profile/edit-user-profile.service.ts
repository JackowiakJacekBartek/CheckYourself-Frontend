import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnedResponse } from 'src/app/shared/models/returned-response';
import { UserProfile } from 'src/app/shared/models/accounts';

@Injectable({ providedIn: 'root' })
export class EditUserProfileService {
    
    constructor(private http: HttpClient) { }

    private get controller() {
        return "api/Account"
    }

    getUserById(id: number): Observable<ReturnedResponse<UserProfile>> {
        return this.http.get<ReturnedResponse<UserProfile>>(`http://20.13.171.179:5010/${this.controller}/get-account-by-id?id=${id}`);
    }

}