import { Component ,  Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Assignment_Model } from '../../assignment.model';
import { Router } from '@angular/router';
import { MatieresService } from '../../../services/matieres.service';
import { MatieresModel } from '../../../models/matieres.model';
import { User_Model } from '../../../user/user.model';
import { UserService } from '../../../services/user.service';

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

  matiere: MatieresModel ;
  enseignant: User_Model ;

  constructor(  private router: Router ,
                private matiere_service: MatieresService ,
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

  }

  show_assignment()
  {
    this.router.navigate(["/list-note/" + this.assignment._id ]) ;
  }
}
