import { Component, Inject, OnInit } from '@angular/core';
import { Note_Model } from '../note.model';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User_Model } from '../../user/user.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-dialog-add-or-update-note',
  standalone: true,
  imports: [
    CommonModule ,
    MatButtonModule ,
    MatIconModule ,
    MatInputModule ,
    MatDialogModule,
    MatMenuModule ,
    FormsModule ,
    MatNativeDateModule ,
    ReactiveFormsModule ,
    MatProgressSpinnerModule
  ],
  templateUrl: './dialog-add-or-update-note.component.html',
  styleUrl: './dialog-add-or-update-note.component.css'
})
export class DialogAddOrUpdateNoteComponent implements OnInit
{
  loader: boolean ;

  note: Note_Model ;
  etudiant: User_Model ;

  hidden_buttons: boolean ;
  is_loading: boolean ;
  message_success: string ;
  message_error: string ;

  add_note_form : FormGroup ;

  constructor(  private form_builder: FormBuilder ,
                private dialog_ref: DialogRef ,
                @Inject( MAT_DIALOG_DATA ) public data: Note_Model ,
                private note_service: NoteService ,
                private user_service: UserService )
  {}

  ngOnInit()
  {
    this.loader = true ;
    this.note = this.data ;
    this.hidden_buttons = false ;

    this.user_service.get_by_id( this.note.etudiant_id ).subscribe(
      (response: User_Model) =>
      {
        this.etudiant = response ;
        this.loader = false ;
      }
    );

    this.add_note_form = this.form_builder.group({
      note_etudiant: [ this.note.note , [ Validators.required ,
                                          Validators.pattern("^[0-9]*$") ,
                                          Validators.min(0) ,
                                          Validators.max(20) ] ] ,
      remarque: [ this.note.remarque ]
    }) ;

  }

  add_note()
  {
    this.is_loading =  true ;
    this.hidden_buttons = true ;

    this.note_service.ajout_note_etu( this.note._id ,
                                      this.add_note_form.value.note_etudiant ,
                                      this.add_note_form.value.remarque ).subscribe( (response) =>
    {
      if( response.updated === false )
      {
        setTimeout(() =>
          {
            this.is_loading = false;
            this.message_error = response.message ;
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
              this.note.note = this.add_note_form.value.note_etudiant ;
              this.note.noted = true ;
              this.note.remarque = this.add_note_form.value.remarque ;
              this.dialog_ref.close() ;
            } , 2000 );
          } , 2000 );
      }
    } ) ;
  }

}
