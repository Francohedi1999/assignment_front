import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import {NavbarComponent} from "./navbar/navbar/navbar.component";
import { NewUserComponent } from './user/new-user/new-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { UpdateOrDeleteUserComponent } from './user/update-or-delete-user/update-or-delete-user.component';
import { AuthGuard } from './guard/auth.guard';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';
import {MatieresComponent} from "./matieres/matieres.component";
import {UpdateMatiereComponent} from "./matieres/update-matiere/update-matiere.component";
import {AddMatiereComponent} from "./matieres/add-matiere/add-matiere.component";
import {Error403Component} from "./error/error403/error403.component";
import { AddAssignementComponent } from './assignment/add-assignement/add-assignement.component';
import { ListAssignmentComponent } from './assignment/list-assignment/list-assignment.component';
import { ListNoteComponent } from './note/list-note/list-note.component';

//  Definition des roles
const ADMINISTRATEUR = 'Administrateur';
const ENSEIGNANT = 'Enseignant';
const ETUDIANT = 'Etudiant';


export const routes: Routes = [
  // On dois ajouter un accueil ici pour une redirection par defaut !!!
  {
    path: '',
    redirectTo: '/list-user',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Assignment MBDS - Connexion' }
  },
  {
    path: 'test',
    component: NavbarComponent,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Navbar' ,
      role: [ADMINISTRATEUR] }
  } ,
  {
    path: 'add-user',
    component: NewUserComponent,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Ajout utilisateur' ,
      role: [ADMINISTRATEUR] }
  } ,
  {
    path: 'list-user',
    component: ListUserComponent,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Liste des utilisateurs' ,
      role: [ADMINISTRATEUR] }
  } ,
  {
    path: 'user/:id_user',
    component: UpdateOrDeleteUserComponent,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Modification ou suppression utilisateur' ,
      role: [ADMINISTRATEUR] }
  } ,
  {
    path: 'profile/:id_user',
    component: UpdateProfileComponent,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Modification ou suppression utilisateur' ,
      role: [ ADMINISTRATEUR , ENSEIGNANT , ETUDIANT ] }
  },
  {
    path: 'matieres',
    component: MatieresComponent,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Matieres' ,
      role: [ ADMINISTRATEUR, ENSEIGNANT ] }
  },
  {
    path: 'matieres/add-matiere',
    component: AddMatiereComponent,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Ajout de matiere' ,
      role: [ADMINISTRATEUR] }
  },
  {
    path: 'matieres/:id',
    component: UpdateMatiereComponent,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Modification de matiere' ,
      role: [ADMINISTRATEUR] }
  },
  {
    path: 'access-denied',
    component: Error403Component,
    data: { title: 'Assignment MBDS - Accès refusé' }
  },
  {
    path: 'add-assignment',
    component: AddAssignementComponent ,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Nouvelle assignation' ,
      role:  [ ENSEIGNANT ] }
  },
  {
    path: 'list-assignment',
    component: ListAssignmentComponent ,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Liste des assignations' ,
      role:  [ ADMINISTRATEUR , ENSEIGNANT ] }
  },
  {
    path: 'list-note/:assignment_id',
    component: ListNoteComponent ,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Note' ,
      role:  [ ENSEIGNANT ] }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
