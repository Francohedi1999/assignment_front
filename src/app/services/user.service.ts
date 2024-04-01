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

  create( user: User_Model ):Observable<any>
  {
    return this.http.post<any>( this.url_service.url + "/user" , user ) ;
  }

}
