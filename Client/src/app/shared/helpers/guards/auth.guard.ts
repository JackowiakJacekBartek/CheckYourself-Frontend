import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/user-service.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(private router: Router, private accountService: AccountService) {}

    canActivate() {
      if (localStorage.getItem('accessToken')) {
        return true;
      }

      this.router.navigate(['/']);
      return false;
    }
}