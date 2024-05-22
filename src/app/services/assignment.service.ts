import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { Assignment_Model } from '../assignment/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService
{
  constructor(  private url_service: UrlService ,
                private http: HttpClient ,
                private auth_service: AuthService ) { }

  create( assignment: Assignment_Model ):Observable<any>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    return this.http.post<any>( this.url_service.assignment , assignment , header ) ;
  }
}
