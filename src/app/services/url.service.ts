import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  url = "http://localhost:3000" ;

  user = this.url + "/user" ;
  auth = this.url + "/auth" ;
  matiere = this.url + "/matieres" ;
}
