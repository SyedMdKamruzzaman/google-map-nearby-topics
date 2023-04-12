import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private auth: AuthService,
    private router: Router){ 
     }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean| UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   
   
    if(this.auth.isAuthenticated()){

      return true;
    }
    this.router.navigate(['auth/login']);
    // return false;
  }
  

}

