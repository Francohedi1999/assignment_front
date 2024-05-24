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

@Component({
  selector: 'app-list-assignment',
  standalone: true,
  imports: [
    CommonModule ,
    OneAssignmentComponent ,
    MatButtonToggleModule ,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  templateUrl: './list-assignment.component.html',
  styleUrl: './list-assignment.component.css'
})
export class ListAssignmentComponent implements OnInit
{
  assignments: Assignment_Model[] ;
  levels: any[];
  filtre_niveau: string ;

  totalDocs = 0;
  page = 1;
  limit = 10;
  totalPages = 0;
  hasPrevPage = false;
  hasNextPage = false;

  pageEvent: PageEvent;

  constructor(  private assignment_service: AssignmentService ,
                private level_service: LevelService ) {}

  ngOnInit()
  {
    this.filtre_niveau = ""
    this.levels = this.level_service.levels ;
    this.get_all_assignment_by_filtre_niveau( this.page , this.limit ) ;
  }

  get_all_assignment_by_filtre_niveau( page: number , limit: number )
  {
    this.assignment_service.get_all( this.filtre_niveau , page , limit ).subscribe(
    ( data ) =>
    {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.limit = data.limit;
      this.page = data.page;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
    }) ;
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

}
