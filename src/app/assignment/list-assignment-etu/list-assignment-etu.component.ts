import { Component, OnInit } from '@angular/core';
import { Assignment_Model } from '../assignment.model';
import { AuthService } from '../../services/auth.service';
import { AssignmentService } from '../../services/assignment.service';
import { OneAssignmentEtuComponent } from './one-assignment-etu/one-assignment-etu.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-assignment-etu',
  standalone: true,
  imports: [
    OneAssignmentEtuComponent ,
    MatPaginatorModule ,
    FormsModule ,    
    MatButtonModule ,
    MatIconModule ,
    MatInputModule ,
    ReactiveFormsModule ,

  ],
  templateUrl: './list-assignment-etu.component.html',
  styleUrl: './list-assignment-etu.component.css'
})
export class ListAssignmentEtuComponent implements OnInit
{
  loader: boolean ;
  assignments: Assignment_Model[] ;
  token_user_logged: string ;
  filtre_desc: string ;

  totalDocs = 0;
  page = 1;
  limit = 10;
  totalPages = 0;
  hasPrevPage = false;
  hasNextPage = false;

  pageEvent: PageEvent;

  constructor(  private auth_service: AuthService ,
                private assignment_service: AssignmentService  )
  {}

  ngOnInit()
  {
    this.loader = true ;
    this.filtre_desc = "" ;
    this.token_user_logged = this.auth_service.get_token_user_logged() ;
    this.get_assignments( this.filtre_desc ) ;
  }

  get_assignments( filtre: string )
  {
    this.auth_service.get_user_logged( this.token_user_logged ).subscribe(
    (user) =>
    {
      this.assignment_service.get_all( user.niveau , this.page , this.limit , "" , filtre , false ).subscribe(
      (data) =>
      {
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.limit = data.limit;
        this.page = data.page;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        this.loader = false ;
      });
    });
  }

  handlePageEvent(event: PageEvent)
  {
    this.page = event.pageIndex + 1 ;
    this.limit = event.pageSize ;
    this.get_assignments( this.filtre_desc ) ;
  }

  filter()
  {
    this.page = 0 ;
    this.get_assignments( this.filtre_desc ) ;
  }
}
