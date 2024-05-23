import { Component, OnInit } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule , MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogNewUserComponent } from './dialog-new-user/dialog-new-user.component';
import { RoleService } from '../../services/role.service';
import { LevelService } from '../../services/level.service';

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
  image_selected : File ;

  error_niveau: string ;

  roles: any[];
  levels: any[];

  hidden_niveau: boolean ;

  new_user_form : FormGroup ;

  constructor(  private form_builder: FormBuilder ,
                private mat_dialog: MatDialog ,
                private role_service: RoleService ,
                private level_service: LevelService )
  { }

  ngOnInit(): void
  {
    this.roles = this.role_service.roles ;
    this.levels = this.level_service.levels ;

    this.reset_new_user_form();
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

    const data =
    {
      data_user : data_user ,
      image_url : URL.createObjectURL( this.image_selected )
    }

    this.mat_dialog.open( DialogNewUserComponent , { width: "1000px" , data: data } );
  }

  on_image_selected(event)
  {
    this.image_selected = event.target.files[0] ;
  }

  on_role_selected(event: MatSelectChange)
  {
    if( event.value !== "Etudiant" )
    {
      this.hidden_niveau = true ;
      this.new_user_form.get("niveau").reset() ;
      this.new_user_form.value.niveau = "" ;
    }
    else
    {
      this.hidden_niveau = false ;
    }
  }

  reset_new_user_form()
  {
    this.hidden_niveau = true ;

    this.new_user_form = this.form_builder.group({
      nom: [ null , [ Validators.required ] ] ,
      prenom: [ null , [ Validators.required ] ] ,
      email: [ null , [ Validators.required , Validators.email ] ] ,
      password: [ "0000" , [ Validators.required ] ] ,
      image: [ null , [ Validators.required ] ] ,
      role: [ null , Validators.pattern("^(Administrateur|Enseignant|Etudiant)$") ] ,
      niveau: [ null , Validators.pattern("^(L1|L2|L3|M1|M2)$") ]
    }) ;
  }

}
