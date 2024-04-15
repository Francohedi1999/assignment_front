import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot , RouterStateSnapshot, UrlTree , Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private auth_service : AuthService , private router: Router ){}

  canActivate( next: ActivatedRouteSnapshot , state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean
  {
    if ( this.auth_service.isLoggedIn() )
    {
      const userRole = this.auth_service.getRole();
      if ( route.data['role'] && route.data['role'].indexOf(userRole) === -1 )
      {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

