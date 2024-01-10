import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/user-service.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(private router: Router, private accountService: AccountService) {}

    canActivate() {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken 
        && accessToken !== "undefined"
        && accessToken !== undefined
        && accessToken !== null
        ) {
        return true;
      }
    
      this.router.navigate(['/']);
      return false;
    }
    
}