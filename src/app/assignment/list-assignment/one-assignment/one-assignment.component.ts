import { Component ,  Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Assignment_Model } from '../../assignment.model';
import { Router } from '@angular/router';
import { MatieresService } from '../../../services/matieres.service';
import { MatieresModel } from '../../../models/matieres.model';
import { User_Model } from '../../../user/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteAssignmentComponent } from '../../dialog-delete-assignment/dialog-delete-assignment.component';

@Component({
  selector: 'app-one-assignment',
  standalone: true,
  imports: [
    MatCardModule ,
    DatePipe
  ],
  templateUrl: './one-assignment.component.html',
  styleUrl: './one-assignment.component.css'
})
export class OneAssignmentComponent implements OnInit
{

  @Input()
  assignment: Assignment_Model ;

  user_logged: User_Model ;
  token_user_logged: string ;

  matiere: MatieresModel ;
  enseignant: User_Model ;

  constructor(  private router: Router ,
                private matiere_service: MatieresService ,
                private user_service: UserService ,
                private mat_dialog: MatDialog ,
                private auth_service: AuthService ) {}

  ngOnInit()
  {
    this.token_user_logged = this.auth_service.get_token_user_logged() ;

    this.auth_service.get_user_logged( this.token_user_logged ).subscribe(
    (response: User_Model) =>
    {
      this.user_logged = response ;
    })

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

  show_assignment()
  {
    if( this.user_logged.role === "Administrateur" )
    {
      if( this.assignment.canceled === false )
      {
        this.mat_dialog.open( DialogDeleteAssignmentComponent , { width: "1000px" , data: this.assignment } );
      }
      else
      {
        this.router.navigate(["/list-assignment"]) ;
      }
    }
    else
    {
      this.router.navigate(["/list-note/" + this.assignment._id ]) ;
    }
  }
}
