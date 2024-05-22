import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { LevelService } from '../../services/level.service';
import { MatieresService } from '../../services/matieres.service';
import { MatieresModel } from '../../models/matieres.model';
import { Assignment_Model } from '../assignment.model';
import { DialogNewAssignmentComponent } from './dialog-new-assignment/dialog-new-assignment.component';

@Component({
  selector: 'app-add-assignement',
  standalone: true,
  imports: [
    CommonModule ,
    MatButtonModule ,
    MatIconModule ,
    MatInputModule ,
    MatDialogModule,
    MatMenuModule ,
    FormsModule ,
    MatDatepickerModule ,
    MatNativeDateModule ,
    ReactiveFormsModule ,
    MatSelectModule
  ],
  templateUrl: './add-assignement.component.html',
  styleUrl: './add-assignement.component.css'
})
export class AddAssignementComponent implements OnInit
{

  new_assignment: Assignment_Model ;
  levels: any[];
  matieres: MatieresModel[];

  new_assignment_form : FormGroup ;

  constructor(  private level_service: LevelService ,
                private matieresService: MatieresService,
                private mat_dialog: MatDialog ,
                private form_builder: FormBuilder )
  {

  }

  ngOnInit()
  {

    this.levels = this.level_service.levels ;

    this.matieresService.getAllMatieres("").subscribe(
      (response: any) => {
        console.log(response.message);
        if (response.data)
        {
          this.matieres = response.data;
        }
      }
    );

    this.reset_new_assignment_form() ;
  }

  reset_new_assignment_form()
  {
    this.new_assignment_form = this.form_builder.group({
      description: [ null , [ Validators.required ] ] ,
      matiere_id: [ null , [ Validators.required ] ] ,
      niveau: [ null , [ Validators.required , Validators.pattern("^(L1|L2|L3|M1|M2)$") ] ]
    }) ;
  }

  check_assignment()
  {
    this.new_assignment = new Assignment_Model() ;

    this.new_assignment.description = this.new_assignment_form.value.description  ;
    this.new_assignment.matiere_id = this.new_assignment_form.value.matiere_id  ;
    this.new_assignment.niveau = this.new_assignment_form.value.niveau  ;

    this.mat_dialog.open( DialogNewAssignmentComponent , { width: "1000px" , data: this.new_assignment } );
  }

}
