import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { User_Model } from '../user/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(  private url_service: UrlService ,
                private http: HttpClient ,
                private auth_service: AuthService ) { }

  create( user_data: FormData ):Observable<any>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    return this.http.post<any>( this.url_service.user , user_data , header ) ;
  }

  get_all_no_pagination( filtre_role: string ):Observable<User_Model[]>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    return this.http.get<User_Model[]>( this.url_service.user + "/no_pagination?filtre_role=" + filtre_role , header ) ;
  }


  get_all(  page: number,
            limit: number ,
            filtre_role: string ,
            niveau_filtre: string):Observable<any>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    const url = this.url_service.user +
                "?page=" +
                page +
                "&limit=" +
                limit +
                "&filtre_role=" +
                filtre_role +
                "&niveau_filtre=" +
                niveau_filtre ;
    return this.http.get<any>( url , header ) ;
  }

  get_by_id( id: string ):Observable<User_Model>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    return this.http.get<User_Model>( this.url_service.user + "/" + id , header ) ;
  }

  update( id_user:string , user_data: FormData ):Observable<any>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    const url = this.url_service.user +
                "/update/" +
                id_user ;
    return this.http.put<any>( url , user_data , header ) ;
  }

  delete_or_restore( id_user: string ):Observable<any>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    const url = this.url_service.user +
                "/delete_or_restore/" +
                id_user ;
    return this.http.put<any>( url , {} , header ) ;
  }

  update_profil( id_user: string , user_data: FormData ):Observable<any>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    const url = this.url_service.user +
                "/update_profile/" +
                id_user ;
    return this.http.put<any>( url , user_data , header ) ;
  }

}
