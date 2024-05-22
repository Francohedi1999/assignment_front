import { Component, OnInit } from '@angular/core';
import { OneAssignmentComponent } from './one-assignment/one-assignment.component';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Assignment_Model } from '../assignment.model';
import { AssignmentService } from '../../services/assignment.service';
import { LevelService } from '../../services/level.service';

@Component({
  selector: 'app-list-assignment',
  standalone: true,
  imports: [
    CommonModule ,
    OneAssignmentComponent ,
    MatButtonToggleModule
  ],
  templateUrl: './list-assignment.component.html',
  styleUrl: './list-assignment.component.css'
})
export class ListAssignmentComponent implements OnInit
{
  assignments: Assignment_Model[] ;
  levels: any[];


  constructor(  private assignment_service: AssignmentService ,
                private level_service: LevelService ) {}

  ngOnInit()
  {
    this.levels = this.level_service.levels ;
    this.get_all_assignment_by_filtre_niveau("") ;
  }

  get_all_assignment_by_filtre_niveau( filtre: string )
  {
    this.assignment_service.get_all( filtre ).subscribe(
    ( response: Assignment_Model[] ) =>
    {
      this.assignments = response ;
    }) ;
  }

}
