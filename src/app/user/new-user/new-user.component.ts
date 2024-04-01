import { Component, OnInit } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule , MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User_Model } from '../user.model';
import { DialogNewUserComponent } from '../dialog-new-user/dialog-new-user.component';

@Component({
  selector: 'app-new-user',
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
    ReactiveFormsModule
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit
{

  constructor(  private form_builder: FormBuilder ,
                private mat_dialog: MatDialog )
  {

  }

  new_user_form: FormGroup ;
  new_user: User_Model ;

  role: any[];
  niveau: any[];

  ngOnInit(): void
  {
    this.role = [
      { option: "Administrateur" , value:"Administrateur" } ,
      { option: "Enseignant(e)" , value:"Enseignant" } ,
      { option: "Etudiant(e)" , value:"Etudiant" }
    ]

    this.niveau = [
      { option: "L1" , value:"L1" } ,
      { option: "L2" , value:"L2" } ,
      { option: "L3" , value:"L3" }
    ]

    this.new_user_form = this.form_builder.group({

      nom: [ null , [ Validators.required ] ] ,
      prenom: [ null , [ Validators.required ] ] ,
      email: [ null , [ Validators.required ] ] ,
      password: [ null , [ Validators.required ] ] ,
      image: [ null , [ Validators.required ] ] ,
      role: [ null , [ Validators.required , Validators.pattern("^(Administrateur|Enseignant|Etudiant)$") ] ] ,
      niveau: [ null , [ Validators.required , Validators.pattern("^(L1|L2|L3)$") ] ]

    }) ;
  }

  check_passation()
  {
    this.new_user = new User_Model() ;

    this.new_user.nom = this.new_user_form.value.nom ;
    this.new_user.prenom = this.new_user_form.value.prenom ;
    this.new_user.email = this.new_user_form.value.email ;
    this.new_user.password = this.new_user_form.value.password ;
    this.new_user.image = this.new_user_form.value.image ;
    this.new_user.role = this.new_user_form.value.role ;
    this.new_user.niveau = this.new_user_form.value.niveau ;

    this.mat_dialog.open( DialogNewUserComponent , { width: "2000px" , data: this.new_user } );
  }

}
