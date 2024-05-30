import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note_Model } from '../note.model';
import { NoteService } from '../../services/note.service';
import { OnNoteComponent } from './on-note/on-note.component';
import { Assignment_Model } from '../../assignment/assignment.model';
import { MatieresModel } from '../../models/matieres.model';
import { User_Model } from '../../user/user.model';
import { AssignmentService } from '../../services/assignment.service';
import { MatieresService } from '../../services/matieres.service';
import { UserService } from '../../services/user.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-note',
  standalone: true,
  imports: [
    OnNoteComponent ,
    CommonModule ,
    FormsModule ,
    MatButtonModule ,
    MatPaginatorModule ,
    MatSelectModule
  ],
  templateUrl: './list-note.component.html',
  styleUrl: './list-note.component.css'
})
export class ListNoteComponent implements OnInit
{
  loader = true ;
  assignment_id: string ;
  notes: Note_Model[] ;

  assignment: Assignment_Model ;
  matiere: MatieresModel ;
  enseignant: User_Model ;

  filtre_rendu: boolean ;
  filtre_noted: boolean ;

  totalDocs = 0;
  page = 1;
  limit = 10;
  totalPages = 0;
  hasPrevPage = false;
  hasNextPage = false;

  pageEvent: PageEvent;

  constructor(  private active_route: ActivatedRoute ,
                private note_service: NoteService ,
                private assignment_service: AssignmentService ,
                private matiere_service: MatieresService ,
                private user_service: UserService )
  {}

  ngOnInit()
  {
    this.filtre_noted = undefined
    this.filtre_rendu = undefined
    this.assignment_id = this.active_route.snapshot.params["assignment_id"] ;

    this.get_all_note_by_assignment( this.filtre_rendu , this.filtre_noted ) ;

    this.assignment_service.get_assignment_by_id( this.assignment_id ).subscribe(
      (response: Assignment_Model) =>
      {
        this.assignment = response ;

        this.matiere_service.getMatiereById( this.assignment.matiere_id ).subscribe(
          (response: any) =>
          {
            this.matiere = response.data ;

            this.user_service.get_by_id( this.matiere.idProf ).subscribe(
            (response: User_Model) =>
            {
              this.enseignant = response ;
            });
          });
      }
    )
    this.loader = false ;

  }

  reset_list()
  {
    this.ngOnInit() ;
  }

  get_all_note_by_assignment( filtre_rendu: boolean , filtre_noted: boolean )
  {
    this.note_service.get_note_by_assignment( this.assignment_id , this.page , this.limit , filtre_rendu , filtre_noted ).subscribe(
    ( data ) =>
    {
      this.notes = data.docs;
      this.totalDocs = data.totalDocs;
      this.limit = data.limit;
      this.page = data.page;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
    } ) ;
  }

  onNotedValueSelect()
  {
    this.page = 0 ;
    this.get_all_note_by_assignment( this.filtre_rendu , this.filtre_noted ) ;
  }

  onRenduValueSelect()
  {
    this.page = 0 ;
    this.get_all_note_by_assignment( this.filtre_rendu , this.filtre_noted ) ;
  }

  handlePageEvent(event: PageEvent)
  {
    this.page = event.pageIndex + 1 ;
    this.limit = event.pageSize ;
    this.get_all_note_by_assignment( this.filtre_rendu , this.filtre_noted ) ;
  }
}
