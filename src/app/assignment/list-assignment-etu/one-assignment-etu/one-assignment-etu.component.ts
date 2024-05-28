import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatieresModel } from '../../../models/matieres.model';
import { MatieresService } from '../../../services/matieres.service';
import { UserService } from '../../../services/user.service';
import { User_Model } from '../../../user/user.model';
import { Assignment_Model } from '../../assignment.model';
import { Note_Model } from '../../../note/note.model';
import { NoteService } from '../../../services/note.service';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMakeAssignmentComponent } from '../dialog-make-assignment/dialog-make-assignment.component';

@Component({
  selector: 'app-one-assignment-etu',
  standalone: true,
  imports: [
    MatCardModule ,
    DatePipe
  ],
  templateUrl: './one-assignment-etu.component.html',
  styleUrl: './one-assignment-etu.component.css'
})
export class OneAssignmentEtuComponent implements OnInit
{

  @Input()
  assignment: Assignment_Model ;

  matiere: MatieresModel ;
  enseignant: User_Model ;
  note: Note_Model ;

  token_user_logged: string ;

  constructor(  private matiere_service: MatieresService ,
                private auth_service: AuthService ,
                private mat_dialog: MatDialog ,
                private note_service: NoteService ,
                private user_service: UserService ) {}

  ngOnInit()
  {
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

    this.token_user_logged = this.auth_service.get_token_user_logged() ;
    this.auth_service.get_user_logged( this.token_user_logged ).subscribe(
    user =>
    {
      this.note_service.get_note_by_assignment_etu( this.assignment._id , user._id ).subscribe(
      note_etu =>
      {
        this.note = note_etu ;
      });
    });

  }

  make_assignment()
  {
    console.log( this.note ) ;
    const data_ = {
      assignment: this.assignment ,
      note: this.note
    }
    this.mat_dialog.open( DialogMakeAssignmentComponent , { width: "1000px" , data: data_ } );
  }

}
