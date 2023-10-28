import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../../services/user-service.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(private router: Router, private accountService: AccountService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      this.accountService.guardCheck();
      const user = true;
      if (user) {
        return true;
      }

      this.router.navigate(['/']);
      return false;
    }
}