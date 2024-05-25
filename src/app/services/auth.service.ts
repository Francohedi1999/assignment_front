import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDialogErrorComponent } from '../auth/login/login-dialog-error/login-dialog-error.component';
import { Observable } from 'rxjs';
import { User_Model } from '../user/user.model';
import {RoleService} from "./role.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  private url_service: UrlService ,
                private http: HttpClient ,
                private router: Router ,
                private dialog_mat: MatDialog,
                private roleService: RoleService
  ){ }

  isLogin = false ;
  roleAs: string ;
  token_user: string ;

  message_error_login: string ;

  login( email:string , password:string )
  {
    return this.http.post<any>( this.url_service.auth + "/login" , { email , password }).subscribe(
    (response) =>
    {
      if( response.logged === true )
      {
        localStorage.setItem( 'TOKEN', response.data );
        this.get_user_logged( response.data ).subscribe( user =>
        {
          this.isLogin = response.logged ;

          localStorage.setItem( 'STATE', 'true' );
          localStorage.setItem( 'ROLE', user.role );
          window.location.href = "profile/" + user._id ;
        } ) ;
      }
      else
      {
        this.message_error_login = response.message ;
        this.dialog_mat.open( LoginDialogErrorComponent , { width: "1000px" , data: this.message_error_login } )
        this.router.navigate(['/login']);
      }
    } ) ;
  }

  isLoggedIn()
  {
    const loggedIn = localStorage.getItem('STATE');

    if ( loggedIn == 'true')
    {
      this.isLogin = true;
    }
    else
    {
      this.isLogin = false;
    }

    return this.isLogin;
  }

  getRole()
  {
    this.roleAs = localStorage.getItem('ROLE');
    return this.roleAs;
  }

  // Verifier si l'utilisateur est un administrateur
  isAdmin(): boolean {
    const role = this.getRole();
    return this.roleService.isAdmin(role);
  }
  // Verifier si l'utilisateur est un enseignant
  isEnseignant(): boolean {
    const role = this.getRole();
    return this.roleService.isEnseignant(role);
  }
  // Verifier si l'utilisateur est un etudiant
  isEtudiant(): boolean {
    const role = this.getRole();
    return this.roleService.isEtudiant(role);
  }


  logout()
  {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem( 'STATE' , 'false' );
    localStorage.setItem( 'TOKEN' , '' );
    localStorage.setItem( 'ROLE' , '' );
    window.location.href = "login" ;
  }

  get_token_user_logged()
  {
    this.token_user = localStorage.getItem('TOKEN');
    return this.token_user ;
  }


  get_user_logged( token_user : string ):Observable<User_Model>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + token_user ) } ;
    return this.http.get<User_Model>( this.url_service.user + "/user_logged" , header ) ;
  }
}
