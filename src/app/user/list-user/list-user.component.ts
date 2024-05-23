import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OneUserComponent } from './one-user/one-user.component';
import { UserService } from '../../services/user.service';
import { User_Model } from '../user.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import {  MatTable, MatTableModule} from '@angular/material/table';
import {  PageEvent , MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatSelectChange , MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    CommonModule ,
    OneUserComponent ,
    MatButtonToggleModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSliderModule,
    MatSelectModule
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})

export class ListUserComponent implements OnInit
{
  utilisateurs: User_Model[] ;
  roles: any[]

  page = 1;
  limit = 10;

  totalDocs !: number;
  totalPages !: number;
  nextPage !: number;
  prevPage !: number;
  hasNextPage !: boolean;
  hasPrevPage !: boolean;

  filtre_role: string;

  pageEvent: PageEvent ;

  constructor(  private user_service: UserService ,
                private role_service: RoleService ) {}

  ngOnInit(): void
  {
    this.roles = this.role_service.roles ;
    this.filtre_role = ""
    this.get_utilisateurs_by_filtre( this.filtre_role ) ;
  }

  get_utilisateurs_by_filtre( filtre: string)
  {
    this.user_service.get_all( this.page , this.limit , filtre ).subscribe( ( data ) =>
    {
      this.utilisateurs = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.hasPrevPage = data.hasPrevPage;
    } ) ;
  }

  onRoleSelect()
  {
    this.page = 1;
    this.get_utilisateurs_by_filtre(this.filtre_role);
  }

  handlePageEvent(event: PageEvent)
  {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.get_utilisateurs_by_filtre( this.filtre_role ) ;
  }
}
