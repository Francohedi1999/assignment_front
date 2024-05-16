  import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  roles = [
    { option: "Administrateur" , value:"Administrateur" } ,
    { option: "Enseignant(e)" , value:"Enseignant" } ,
    { option: "Etudiant(e)" , value:"Etudiant" }
  ] ;
}
