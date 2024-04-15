import { Component, OnInit } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { User_Model } from '../../user/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButton,
    MatDivider,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    RouterLink,
    RouterOutlet,
    MatMenuTrigger
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit
{
  role_user_logged: string ;
  is_logged: boolean ;
  user_logged: User_Model ;
  token_user_logged: string ;

  constructor( private auth_service: AuthService , private user_service: UserService ) {}

  ngOnInit()
  {
    this.role_user_logged = this.auth_service.getRole() ;
    this.is_logged = this.auth_service.isLoggedIn() ;
    this.token_user_logged = this.auth_service.get_token_user_logged() ;
    this.auth_service.get_user_logged( this.token_user_logged ).subscribe(
    ( response ) =>
    {
      this.user_service.get_by_id( response._id ).subscribe(
      (response) =>
      {
        this.user_logged = response ;
      } )
    } ) ;
  }

  log_out()
  {
    window.location.href = "login" ;
    this.auth_service.logout() ;
  }

}
