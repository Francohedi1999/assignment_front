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

  get_all(  filtre_niveau: string ,
            page: number,
            limit: number ,
            id_enseignant: string ,
            filtre_canceled: boolean ): Observable<any>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    const url = this.url_service.assignment +
                "?page=" +
                page +
                "&limit=" +
                limit +
                "&filtre_niveau=" +
                filtre_niveau +
                "&id_enseignant=" +
                id_enseignant +
                "&filtre_canceled=" +
                filtre_canceled ;
    return this.http.get<any>( url , header ) ;
  }

  get_assignment_by_id( assignment_id: string ): Observable<Assignment_Model>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    return this.http.get<Assignment_Model>( this.url_service.assignment + "/" + assignment_id , header ) ;
  }

  delete_assignment( assignment_id: string ): Observable<any>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    return this.http.put<any>( this.url_service.assignment + "/" + assignment_id, {} , header ) ;
  }
}
