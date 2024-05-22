import { Component, Inject, OnInit } from '@angular/core';
import { AssignmentService } from '../../../services/assignment.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatieresService } from '../../../services/matieres.service';
import { Assignment_Model } from '../../assignment.model';
import { MatieresModel } from '../../../models/matieres.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dialog-new-assignment',
  standalone: true,
  imports: [
    CommonModule ,
    MatDialogModule ,
    MatButtonModule ,
    MatIconModule ,
    MatProgressSpinnerModule
  ],
  templateUrl: './dialog-new-assignment.component.html',
  styleUrl: './dialog-new-assignment.component.css'
})
export class DialogNewAssignmentComponent implements OnInit{

  assignment: Assignment_Model ;
  matiere: MatieresModel ;

  hidden_buttons: boolean ;
  is_loading: boolean ;
  message_success: string ;
  message_error: string ;

  constructor(  private dialog_ref: DialogRef ,
                @Inject( MAT_DIALOG_DATA ) public data: Assignment_Model ,
                private assignment_service: AssignmentService ,
                private matiere_service: MatieresService ,
                private router: Router ) { }

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

  add_assignment()
  {
    this.is_loading =  true ;
    this.hidden_buttons = true ;

    this.assignment_service.create(this.assignment).subscribe( (response) =>
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
              this.router.navigate([ "/" ]) ;
            } , 3000 ); // Redirection après 1 seconde
          } , 3000 ); // Message de succès affiché pendant 2 secondes
      }
      else
      {
        setTimeout(() =>
          {
            this.is_loading = false;
            this.message_success = response.message;
            setTimeout( () =>
            {
              this.dialog_ref.close() ;
              this.router.navigate([ "/list-user" ]) ;
            } , 3000 ); // Redirection après 1 seconde
          } , 3000 ); // Message de succès affiché pendant 2 secondes
      }
    } ) ;
  }

}
