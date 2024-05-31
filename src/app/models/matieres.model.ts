import {User_Model} from "../user/user.model";

export class MatieresModel {
  id: string;
  nom!: string;
  imageMatiere!: string;
  idProf!: string;
  enseignant?: User_Model;
  deletedAt?: Date;
}
