import { Injectable } from '@angular/core';
import {UrlService} from "./url.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {MatieresModel} from "../models/matieres.model";
import {Observable} from "rxjs";
import {User_Model} from "../user/user.model";

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  constructor(  private url_service: UrlService ,
                private http: HttpClient ,
                private auth_service: AuthService ) { }

  getAllMatieres(enseignant_id?: string): Observable<MatieresModel[]> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.auth_service.get_token_user_logged()}`);
    let params = {};
    if (enseignant_id) {
      params = { enseignant_id };
    }
    const url = this.url_service.matiere;

    return this.http.get<MatieresModel[]>(url, { headers, params });
  }

  getMatiereById( id: string ):Observable<MatieresModel|undefined>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    return this.http.get<MatieresModel>( this.url_service.matiere + "/" + id , header ) ;
  }

  updateMatiere(id: string, formData: FormData): Observable<any> {
    const header = { headers: new HttpHeaders().set("Authorization", "Bearer " + this.auth_service.get_token_user_logged())};
    return this.http.put<any>(this.url_service.matiere + "/" + id, formData, header);
  }

  addMatiere(formData: FormData) {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    return this.http.post<any>( this.url_service.matiere , formData , header ) ;
  }

  deleteMatiere( id: string ):Observable<any>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    return this.http.delete<any>( this.url_service.matiere + "/" + id, header);
  }
}
