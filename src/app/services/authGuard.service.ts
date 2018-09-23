import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
	constructor(private router: Router, private authenticationService: AuthService) {}
  
  	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        if (!this.authenticationService.isAuthenticated()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }

}