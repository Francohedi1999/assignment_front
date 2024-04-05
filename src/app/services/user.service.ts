import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { User_Model } from '../user/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(  private url_service: UrlService ,
                private http: HttpClient ) { }

  create( user_data: FormData ):Observable<any>
  {
    return this.http.post<any>( this.url_service.user , user_data ) ;
  }

  get_all( filtre_role: string ):Observable<User_Model[]>
  {
    return this.http.get<User_Model[]>( this.url_service.user + "?filtre_role=" + filtre_role ) ;
  }

  get_by_id( id: string ):Observable<User_Model>
  {
    return this.http.get<User_Model>( this.url_service.user + "/" + id ) ;
  }
}
