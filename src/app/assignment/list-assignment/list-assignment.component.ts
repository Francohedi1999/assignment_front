import { Component, OnInit } from '@angular/core';
import { OneAssignmentComponent } from './one-assignment/one-assignment.component';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Assignment_Model } from '../assignment.model';
import { AssignmentService } from '../../services/assignment.service';
import { LevelService } from '../../services/level.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-assignment',
  standalone: true,
  imports: [
    CommonModule ,
    OneAssignmentComponent ,
    MatButtonToggleModule ,
    FormsModule,
    MatPaginatorModule,
    MatButtonModule ,
    MatSelectModule
  ],
  templateUrl: './list-assignment.component.html',
  styleUrl: './list-assignment.component.css'
})
export class ListAssignmentComponent implements OnInit
{
  loader: boolean ;
  assignments: Assignment_Model[] ;
  levels: any[];
  filtre_niveau: string ;
  filtre_canceled: boolean ;
  canceled_disabled: boolean ;

  totalDocs = 0;
  page = 1;
  limit = 10;
  totalPages = 0;
  hasPrevPage = false;
  hasNextPage = false;

  token_user_logged: string ;

  pageEvent: PageEvent;

  constructor(  private assignment_service: AssignmentService ,
                private auth_service: AuthService ,
                private level_service: LevelService ) {}

  ngOnInit()
  {
    this.loader = true ;
    this.token_user_logged = this.auth_service.get_token_user_logged() ;
    this.filtre_niveau = ""
    this.filtre_canceled = undefined
    this.levels = this.level_service.levels ;
    this.get_all_assignment_by_filtre_niveau( this.page , this.limit ) ;
  }

  reset_list()
  {
    this.ngOnInit() ;
  }

  get_all_assignment_by_filtre_niveau( page: number , limit: number )
  {
    this.auth_service.get_user_logged( this.token_user_logged ).subscribe(
      user =>
      {
        if( user.role === "Administrateur" )
        {
          this.canceled_disabled = false ;
          this.assignment_service.get_all( this.filtre_niveau , page , limit , "" , this.filtre_canceled ).subscribe(
          ( data ) =>
          {
            this.assignments = data.docs;
            this.totalDocs = data.totalDocs;
            this.limit = data.limit;
            this.page = data.page;
            this.totalPages = data.totalPages;
            this.hasPrevPage = data.hasPrevPage;
            this.hasNextPage = data.hasNextPage;
            this.loader = false ;
          }) ;
        }
        else
        {
          this.canceled_disabled = true ;
          this.assignment_service.get_all( this.filtre_niveau , page , limit , user._id , false ).subscribe(
            ( data ) =>
            {
              this.assignments = data.docs;
              this.totalDocs = data.totalDocs;
              this.limit = data.limit;
              this.page = data.page;
              this.totalPages = data.totalPages;
              this.hasPrevPage = data.hasPrevPage;
              this.hasNextPage = data.hasNextPage;
              this.loader = false ;
            }) ;
        }
      } ) ;
  }

  handlePageEvent(event: PageEvent)
  {
    this.page = event.pageIndex + 1 ;
    this.limit = event.pageSize ;
    this.get_all_assignment_by_filtre_niveau( this.page , this.limit ) ;
  }


  onLevelSelect()
  {
    this.page = 0 ;
    this.get_all_assignment_by_filtre_niveau( this.page , this.limit ) ;
  }

  onCancelSelect()
  {
    this.page = 0 ;
    this.get_all_assignment_by_filtre_niveau( this.page , this.limit ) ;
  }

}
