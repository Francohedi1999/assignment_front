import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OneUserComponent } from './one-user/one-user.component';
import { UserService } from '../../services/user.service';
import { User_Model } from '../user.model';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import {  PageEvent , MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { LevelService } from '../../services/level.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    CommonModule ,
    OneUserComponent ,
    FormsModule,
    MatButtonModule ,
    MatPaginatorModule,
    MatSelectModule
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})

export class ListUserComponent implements OnInit
{
  loader = true ;
  utilisateurs: User_Model[] ;
  roles: any[] ;
  levels: any[] ;
  filtre_role: string ;
  filtre_niveau: string ;

  niveau_disabled: boolean ;

  totalDocs = 0;
  page = 1;
  limit = 10;
  totalPages = 0;
  hasPrevPage = false;
  hasNextPage = false;

  pageEvent: PageEvent;

  constructor(  private user_service: UserService ,
                private role_service: RoleService ,
                private level_service: LevelService ) {}

  ngOnInit(): void
  {
    this.niveau_disabled = true ;
    this.roles = this.role_service.roles ;
    this.levels = this.level_service.levels ;

    this.filtre_role = ""
    this.filtre_niveau = ""
    this.get_utilisateurs_by_filtre( this.filtre_role , this.filtre_niveau ) ;
  }

  reset_list()
  {
    this.ngOnInit() ;
  }

  handlePageEvent(event: PageEvent)
  {
    this.page = event.pageIndex + 1 ;
    this.limit = event.pageSize ;
    this.get_utilisateurs_by_filtre(this.filtre_role , this.filtre_niveau) ;
  }

  get_utilisateurs_by_filtre( filtre_role: string , filtre_niveau: string )
  {
    this.user_service.get_all( this.page , this.limit , filtre_role , filtre_niveau ).subscribe( ( data ) =>
    {
      this.utilisateurs = data.docs;
      this.totalDocs = data.totalDocs;
      this.limit = data.limit;
      this.page = data.page;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
    } ) ;
    this.loader = false ;
  }

  onRoleSelect()
  {
    this.page = 0 ;
    if( this.filtre_role !== "Etudiant" )
    {
      this.niveau_disabled = true ;
      this.filtre_niveau = "" ;
    }
    else
    {
      this.niveau_disabled = false ;
    }
    this.get_utilisateurs_by_filtre(this.filtre_role , this.filtre_niveau) ;
  }

  onLevelSelect()
  {
    this.page = 0 ;
    this.get_utilisateurs_by_filtre(this.filtre_role , this.filtre_niveau) ;
  }

}
