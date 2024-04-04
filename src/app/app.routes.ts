import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import {NavbarComponent} from "./navbar/navbar/navbar.component";
import { NewUserComponent } from './user/new-user/new-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';

//export const routes: Routes = [];

export const routes: Routes = [
  { path: '', component: LoginComponent, data: { title: 'Assignment MBDS - Connexion ou Inscription' } },
  { path: 'login', component: LoginComponent, data: { title: 'Assignment MBDS - Connexion ou Inscription' } },
  { path: 'test', component: NavbarComponent, data: { title: 'Assignment MBDS - Navbar' } } ,
  { path: 'add-user', component: NewUserComponent, data: { title: 'Assignment MBDS - Ajout utilisateur' } } ,
  { path: 'list-user', component: ListUserComponent, data: { title: 'Assignment MBDS - Liste des utilisateurs' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
