import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnedResponse } from 'src/app/shared/models/returned-response';
import { UserProfile } from 'src/app/shared/models/accounts';
import { localUrl } from 'src/app/shared/constants/constants';

@Injectable({ providedIn: 'root' })
export class EditUserProfileService {
    
    constructor(private http: HttpClient) { }

    private get controller() {
        return "api/Account"
    }

    public getUserById(id: number): Observable<ReturnedResponse<UserProfile>> {
        return this.http.get<ReturnedResponse<UserProfile>>(`${localUrl}/${this.controller}/get-account-by-id?id=${id}`);
    }

    public updateUserById(id: number, model: UserProfile): Observable<ReturnedResponse<UserProfile>> {
        // console.log(id)
        return this.http.patch<ReturnedResponse<UserProfile>>(`${localUrl}/${this.controller}/update-account-by-id?id=${id}`, model);
    }

}
