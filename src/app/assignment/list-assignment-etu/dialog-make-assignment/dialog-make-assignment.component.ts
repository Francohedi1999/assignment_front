import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Assignment_Model } from '../../assignment.model';
import { NoteService } from '../../../services/note.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatieresModel } from '../../../models/matieres.model';
import { MatieresService } from '../../../services/matieres.service';
import { Note_Model } from '../../../note/note.model';

@Component({
  selector: 'app-dialog-make-assignment',
  standalone: true,
  imports: [
    CommonModule ,
    DatePipe ,
    MatDialogModule ,
    MatButtonModule ,
    MatIconModule ,
    MatProgressSpinnerModule
  ],
  templateUrl: './dialog-make-assignment.component.html',
  styleUrl: './dialog-make-assignment.component.css'
})
export class DialogMakeAssignmentComponent implements OnInit
{
  loader: boolean ;

  note: Note_Model ;
  assignment: Assignment_Model ;
  matiere: MatieresModel ;

  hidden_buttons: boolean ;
  is_loading: boolean ;
  message_success: string ;
  message_error: string ;

  constructor(  private dialog_ref: DialogRef ,
                @Inject( MAT_DIALOG_DATA ) public data: any ,
                private matiere_service: MatieresService ,
                private note_service: NoteService )
  {}

  ngOnInit()
  {
    this.loader = true ;
    this.assignment = this.data.assignment ;
    this.note = this.data.note ;
    this.matiere_service.getMatiereById( this.assignment.matiere_id ).subscribe(
      (response:any) =>
      {
        this.matiere = response.data ;
        this.loader = false ;
      }
    ) ;
  }

  make_assignment()
  {
    this.is_loading =  true ;
    this.hidden_buttons = true ;

    this.note_service.make_assignment(this.note._id).subscribe( (response) =>
    {
      if( response.created === false )
      {
        setTimeout(() =>
          {
            this.is_loading = false;
            this.message_error = response.message;
            setTimeout( () =>
            {
              this.dialog_ref.close() ;
            } , 2000 );
          } , 2000 );
      }
      else
      {
        setTimeout(() =>
          {
            this.is_loading = false;
            this.message_success = response.message;
            setTimeout( () =>
            {
              this.note.rendu = true ;
              this.dialog_ref.close() ;
            } , 2000 );
          } , 2000 );
      }
    } ) ;
  }

}
