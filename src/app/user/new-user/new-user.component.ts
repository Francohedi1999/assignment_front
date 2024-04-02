import { Component, OnInit } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule , MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule, FormsModule } from '@angular/forms';
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
    ReactiveFormsModule ,
    MatSelectModule
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit
{

  nom: string ;
  prenom: string ;
  email: string ;
  password: string ;
  role: string ;
  niveau: string ;

  image_selected : File ;

  roles: any[];
  levels: any[];

  new_user_form : FormGroup ;

  constructor(  private form_builder: FormBuilder ,
                private mat_dialog: MatDialog )
  { }




  ngOnInit(): void
  {

    this.roles = [
      { option: "Administrateur" , value:"Administrateur" } ,
      { option: "Enseignant(e)" , value:"Enseignant" } ,
      { option: "Etudiant(e)" , value:"Etudiant" }
    ]

    this.levels = [
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
      niveau: [ null , Validators.pattern("^(L1|L2|L3)$") ]

    }) ;
  }

  check_user()
  {
    const data_user = new FormData() ;

    data_user.append("nom" , this.new_user_form.value.nom ) ;
    data_user.append("prenom" , this.new_user_form.value.prenom ) ;
    data_user.append("email" , this.new_user_form.value.email ) ;
    data_user.append("password" , this.new_user_form.value.password ) ;
    data_user.append("image" , this.image_selected ) ;
    data_user.append("role" , this.new_user_form.value.role ) ;
    data_user.append("niveau" , this.new_user_form.value.niveau ) ;

    const image_url = URL.createObjectURL( this.image_selected ) ;

    const data = {
      data_user : data_user ,
      image_url : image_url
    }

    this.mat_dialog.open( DialogNewUserComponent , { width: "500px" , data: data } );
  }

  on_image_selected(event)
  {
    this.image_selected = event.target.files[0] ;
  }


}
