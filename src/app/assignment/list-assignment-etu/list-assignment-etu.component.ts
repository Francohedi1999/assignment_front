import { Component, OnInit } from '@angular/core';
import { Assignment_Model } from '../assignment.model';
import { AuthService } from '../../services/auth.service';
import { AssignmentService } from '../../services/assignment.service';
import { OneAssignmentEtuComponent } from './one-assignment-etu/one-assignment-etu.component';

@Component({
  selector: 'app-list-assignment-etu',
  standalone: true,
  imports: [
    OneAssignmentEtuComponent
  ],
  templateUrl: './list-assignment-etu.component.html',
  styleUrl: './list-assignment-etu.component.css'
})
export class ListAssignmentEtuComponent implements OnInit
{
  assignments: Assignment_Model[] ;
  token_user_logged: string ;

  constructor(  private auth_service: AuthService ,
                private assignment_service: AssignmentService  )
  {}

  ngOnInit()
  {

    this.token_user_logged = this.auth_service.get_token_user_logged() ;

    this.auth_service.get_user_logged( this.token_user_logged ).subscribe(
    user =>
    {
      this.assignment_service.get_all( user.niveau ).subscribe(
      assignments_etu =>
      {
        this.assignments = assignments_etu ;
      });
    });

  }
}
