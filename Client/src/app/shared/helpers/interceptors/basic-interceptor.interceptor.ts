import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AccountService } from '../../services/user-service.service';
import { jwtDecode } from 'jwt-decode';
import { ReturnedResponse } from '../../models/returned-response';

export interface RefreshToken {
  refreshToken: string;
  accessToken: string;
}

interface DecodedToken {
  exp: number;
}

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private currentUserToken: string | null = localStorage.getItem('accessToken');

  constructor(private accountService: AccountService, private http: HttpClient) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      if (this.currentUserToken && this.currentUserToken != "undefined") {
        if (this.isTokenExpired(this.currentUserToken)) {
          // this.accountService.logout();
          // return this.refreshTokenAndRetry(request, next);
        } else {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.currentUserToken}`
            }
          });
        }
      }
    
      return next.handle(request);
    }
    

  private isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    if (decodedToken.exp === undefined) return true;

    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);

    if (date === null) return true;

    const isTokenExpired = date.valueOf() < new Date().valueOf();

    return isTokenExpired;
  }

    // private refreshTokenAndRetry(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //   // console.log('leci');
    
    //   return this.http.post<ReturnedResponse<RefreshToken>>(
    //     `http://68.219.240.80:5010/api/Account/refresh-token`,
    //     { accessToken: this.currentUserToken, refreshToken: '' }
    //   ).pipe(
    //     catchError((error: HttpErrorResponse) => {
    //       // Handle token refresh error (np. wyloguj użytkownika)
    //       this.accountService.logout();
    //       return throwError(error);
    //     }),
    //     switchMap((response: ReturnedResponse<RefreshToken>) => {
    //       // console.log('HEREEE', response);
    //       const newToken = response.methodResult.accessToken;
    
    //       localStorage.setItem('accessToken', newToken);
    //       this.currentUserToken = newToken;
    
    //       request = request.clone({
    //         setHeaders: {
    //           Authorization: `Bearer ${newToken}`
    //         }
    //       });
    
    //       // Kontynuuj żądanie z nowym tokenem
    //       return next.handle(request);
    //     }),
    //     // Użyj operatora `of` do stworzenia nowego observable
    //     switchMap(response => of(response))
    //   );
    // }

}
