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

@Component({
  selector: 'app-list-note',
  standalone: true,
  imports: [
    OnNoteComponent
  ],
  templateUrl: './list-note.component.html',
  styleUrl: './list-note.component.css'
})
export class ListNoteComponent implements OnInit
{
  assignment_id: string ;
  notes: Note_Model[] ;

  assignment: Assignment_Model ;
  matiere: MatieresModel ;
  enseignant: User_Model ;

  constructor(  private active_route: ActivatedRoute ,
                private note_service: NoteService ,
                private assignment_service: AssignmentService ,
                private matiere_service: MatieresService ,
                private user_service: UserService )
  {}

  ngOnInit()
  {
    this.assignment_id = this.active_route.snapshot.params["assignment_id"] ;

    this.note_service.get_note_by_assignment( this.assignment_id ).subscribe(
    (response: Note_Model[]) =>
    {
      this.notes = response ;
    }
    );

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

  }
}
