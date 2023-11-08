import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AccountService } from '../../services/user-service.service';
import { User } from '../../models/accounts';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private currentUserToken: string | null = localStorage.getItem('accessToken');

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.currentUserToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.currentUserToken}`
        }
      })
    }

    return next.handle(request);
  }
}