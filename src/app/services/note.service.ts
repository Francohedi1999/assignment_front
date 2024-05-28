import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { Note_Model } from '../note/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(  private url_service: UrlService ,
                private http: HttpClient ,
                private auth_service: AuthService) { }


  get_note_by_assignment( assignment_id:string ,
                          page: number ,
                          limit: number ,
                          rendu: boolean ,
                          noted: boolean ):Observable<any>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    const url = this.url_service.note +
                "/" +
                assignment_id +
                "?page=" +
                page +
                "&limit=" +
                limit +
                "&filtre_rendu=" +
                rendu +
                "&filtre_noted=" +
                noted ;
    return this.http.get<any>( url , header ) ;
  }

  get_note_by_assignment_etu( assignment_id:string , etudiant_id:string ):Observable<Note_Model>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    const url = this.url_service.note +
                "/etu/" +
                assignment_id +
                "/" +
                etudiant_id ;
    return this.http.get<Note_Model>( url , header ) ;
  }


  ajout_note_etu( id_note: string , note_update: number ):Observable<any>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    const url = this.url_service.note +
                "/ajout/" +
                id_note
    return this.http.put<any>( url , { note: note_update } , header ) ;
  }

  make_assignment( id_note: string ):Observable<any>
  {
    const header = { headers : new HttpHeaders().set("Authorization" , "Bearer " + this.auth_service.get_token_user_logged() ) } ;
    const url = this.url_service.note +
                "/make/" +
                id_note
    return this.http.put<any>( url , {} , header ) ;
  }

}
