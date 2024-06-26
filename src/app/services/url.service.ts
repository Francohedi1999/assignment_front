import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService
{
  constructor() { }

  // url = "http://localhost:3000" ;
  url = "https://assignment-back-5bbq.onrender.com" ;

  user = this.url + "/user" ;
  auth = this.url + "/auth" ;
  matiere = this.url + "/matieres" ;
  assignment = this.url + "/assignment" ;
  note = this.url + "/note" ;
}
