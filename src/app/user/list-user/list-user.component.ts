import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OneUserComponent } from '../one-user/one-user.component';
import { UserService } from '../../services/user.service';
import { User_Model } from '../user.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    CommonModule ,
    OneUserComponent ,
    MatButtonToggleModule
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})

export class ListUserComponent implements OnInit
{
  utilisateurs: User_Model[] ;

  constructor( private user_service: UserService ) {}

  ngOnInit(): void
  {
    this.get_utilisateurs_by_filtre('') ;
  }

  get_utilisateurs_by_filtre( filtre: string)
  {
    this.user_service.get_all( filtre ).subscribe( ( response ) =>
    {
      this.utilisateurs = response ;
    } ) ;
  }

}
