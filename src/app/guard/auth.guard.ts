import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private authService : AuthService , private router: Router ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  private checkUserLogin(route: ActivatedRouteSnapshot, url: string): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getRole().toLowerCase();
      const allowedRoles = (route.data['role'] as string[]).map(role => role.toLowerCase());

      // Verifier si le role de l'utilisateur est autorisé à accéder à la route
      // Si le role actuel de l'utilisateur n'est pas dans la liste des roles autorisés (error 403)
      if (route.data['role'] && !allowedRoles.includes(userRole)) {
        return this.router.createUrlTree(['/access-denied']);
      }
      return true; // L'utilisateur est connecté et son role est autorisé à accéder à la route
    }
    return this.router.createUrlTree(['/login']);
  }
}

