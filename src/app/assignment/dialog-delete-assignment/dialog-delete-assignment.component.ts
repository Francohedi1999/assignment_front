import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AssignmentService } from '../../services/assignment.service';
import { Assignment_Model } from '../assignment.model';
import { MatieresService } from '../../services/matieres.service';
import { MatieresModel } from '../../models/matieres.model';

@Component({
  selector: 'app-dialog-delete-assignment',
  standalone: true,
  imports: [
    CommonModule ,
    DatePipe ,
    MatDialogModule ,
    MatButtonModule ,
    MatIconModule ,
    MatProgressSpinnerModule
  ],
  templateUrl: './dialog-delete-assignment.component.html',
  styleUrl: './dialog-delete-assignment.component.css'
})
export class DialogDeleteAssignmentComponent implements OnInit
{
  assignment: Assignment_Model ;
  matiere: MatieresModel ;

  hidden_buttons: boolean ;
  is_loading: boolean ;
  message_success: string ;
  message_error: string ;

  constructor(  private dialog_ref: DialogRef ,
                @Inject( MAT_DIALOG_DATA ) public data: Assignment_Model ,
                private assignment_service: AssignmentService ,
                private matiere_service: MatieresService )
  {}

  ngOnInit()
  {
    this.assignment = this.data ;
    this.matiere_service.getMatiereById( this.assignment.matiere_id ).subscribe(
      (response:any) =>
      {
        this.matiere = response.data ;
      }
    ) ;
  }

  delete_assignment()
  {
    this.is_loading =  true ;
    this.hidden_buttons = true ;

    this.assignment_service.delete_assignment(this.assignment._id).subscribe( (response) =>
    {
      if( response.updated === false )
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
              this.assignment.canceled = true ;
              this.dialog_ref.close() ;
            } , 2000 );
          } , 2000 );
      }
    } ) ;
  }
}
