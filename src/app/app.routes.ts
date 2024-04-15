import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import {NavbarComponent} from "./navbar/navbar/navbar.component";
import { NewUserComponent } from './user/new-user/new-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { UpdateOrDeleteUserComponent } from './user/update-or-delete-user/update-or-delete-user.component';
import { AuthGuard } from './guard/auth.guard';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';

//export const routes: Routes = [];

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Assignment MBDS - Connexion' }
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
      role: 'Administrateur' }
  } ,
  {
    path: 'add-user',
    component: NewUserComponent,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Ajout utilisateur' ,
      role: 'Administrateur' }
  } ,
  {
    path: 'list-user',
    component: ListUserComponent,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Liste des utilisateurs' ,
      role: 'Administrateur' }
  } ,
  {
    path: 'user/:id_user',
    component: UpdateOrDeleteUserComponent,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Modification ou suppression utilisateur' ,
      role: 'Administrateur' }
  } ,
  {
    path: 'profile/:id_user',
    component: UpdateProfileComponent,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Assignment MBDS - Modification ou suppression utilisateur' ,
      role: [ 'Administrateur' , 'Enseignant' , 'Etudiant' ] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
