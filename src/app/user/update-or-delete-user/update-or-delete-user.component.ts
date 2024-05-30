import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { User_Model } from '../user.model';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { LevelService } from '../../services/level.service';
import { DialogUpdateUserComponent } from './dialog-update-user/dialog-update-user.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-update-or-delete-user',
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
    MatSelectModule ,
    MatProgressSpinnerModule
  ],
  templateUrl: './update-or-delete-user.component.html',
  styleUrl: './update-or-delete-user.component.css'
})
export class UpdateOrDeleteUserComponent implements OnInit
{
  loader = true ;

  id_user: string ;
  user_img_url_recent: string ;
  user: User_Model ;

  image_selected : File ;

  error_niveau: string ;

  roles: any[];
  levels: any[];

  hidden_buttons: boolean ;
  is_loading: boolean ;
  message_success: string ;

  update_user_form : FormGroup ;

  hidden_niveau: boolean ;

  constructor(  private form_builder: FormBuilder ,
                private mat_dialog: MatDialog ,
                private active_route: ActivatedRoute ,
                private user_service: UserService ,
                private role_service: RoleService ,
                private level_service: LevelService  ,
                private router: Router )
  { }

  ngOnInit(): void
  {
    this.hidden_buttons = false ;

    this.roles = this.role_service.roles ;
    this.levels = this.level_service.levels ;

    this.id_user = this.active_route.snapshot.params["id_user"] ;

    this.update_user_form = new FormGroup({
      nom: new FormControl() ,
      prenom: new FormControl() ,
      email: new FormControl() ,
      role: new FormControl() ,
      niveau: new FormControl() ,
      image: new FormControl() ,
    });

    this.user_service.get_by_id( this.id_user ).subscribe( ( response ) =>
    {
      this.user = response ;
      this.user_img_url_recent = this.user.img_url ;

      this.reset_update_user_form() ;

      if( this.user.role !== "Etudiant" )
      {
        this.hidden_niveau = true ;
      }
      this.loader = false ;
    } ) ;

  }

  check_user()
  {
    const data_user = new FormData() ;
    data_user.append("_id" , this.id_user ) ;
    data_user.append("nom" , this.update_user_form.value.nom ) ;
    data_user.append("prenom" , this.update_user_form.value.prenom ) ;
    data_user.append("email" , this.update_user_form.value.email ) ;
    data_user.append("role" , this.update_user_form.value.role ) ;

    if( this.update_user_form.value.role === "Etudiant" )
    {
      if( this.update_user_form.value.niveau === null )
      {
        data_user.append("niveau" , this.user.niveau ) ;
      }
      else
      {
        data_user.append("niveau" , this.update_user_form.value.niveau ) ;
      }
    }
    else
    {
      data_user.append("niveau" , "" ) ;
    }


    let image_url = "" ;
    if( this.image_selected )
    {
      image_url = URL.createObjectURL( this.image_selected ) ;
      data_user.append("image" , this.image_selected ) ;
    }
    else
    {
      image_url = this.user_img_url_recent ;
    }

    const data = {
      image_url: image_url ,
      data_user : data_user ,
    }
    this.mat_dialog.open( DialogUpdateUserComponent , { width: "1000px" , data: data } );
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
      this.update_user_form.get("niveau").reset() ;
      this.update_user_form.value.niveau = "" ;
    }
    else
    {
      this.hidden_niveau = false ;
    }
  }

  reset_update_user_form()
  {
    this.hidden_niveau = true ;

    this.update_user_form = this.form_builder.group({
      nom: [ this.user.nom , [Validators.required] ],
      prenom: [ this.user.prenom , [ Validators.required ] ],
      email: [ this.user.email , [ Validators.required, Validators.email ] ],
      role: [ this.user.role , [ Validators.pattern("^(Administrateur|Enseignant|Etudiant)$") ] ],
      niveau: [ null , [ Validators.pattern("^(L1|L2|L3|M1|M2)$") ] ] ,
      image: [ null ]
    }) ;
  }

  delete_restore_utilisateur()
  {
    this.is_loading =  true ;
    this.hidden_buttons = true ;

    this.user_service.delete_or_restore(this.user._id).subscribe( (response) =>
    {
      setTimeout(() =>
        {
          this.is_loading = false;
          this.message_success = response.message;
          setTimeout( () =>
          {
            this.router.navigate([ "/list-user" ]) ;
          } , 3000 );
        } , 3000 );
    } ) ;
  }

}
