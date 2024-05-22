  import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public static readonly ADMINISTRATEUR = 'Administrateur';
  public static readonly ENSEIGNANT = 'Enseignant';
  public static readonly ETUDIANT = 'Etudiant';

  constructor() { }

  roles = [
    { option: RoleService.ADMINISTRATEUR , value: RoleService.ADMINISTRATEUR },
    { option: "Enseignant(e)" , value: RoleService.ENSEIGNANT },
    { option: "Etudiant(e)" , value: RoleService.ETUDIANT }
  ];

  //  Verifier si le role est un administrateur
  isAdmin(role: string): boolean {
    if (role.toLowerCase() === RoleService.ADMINISTRATEUR.toLowerCase()){
      return true;
    }
    return false;
  }

}
