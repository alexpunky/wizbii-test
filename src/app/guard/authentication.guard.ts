import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router, public authentication: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authentication.isLogged()) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
