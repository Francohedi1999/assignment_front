import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User_Model } from '../user.model';
import { DialogUpdateProfileComponent } from './dialog-update-profile/dialog-update-profile.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    CommonModule ,
    MatButtonModule ,
    MatIconModule ,
    MatInputModule ,
    MatDialogModule,
    MatMenuModule ,
    FormsModule ,
    ReactiveFormsModule
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit
{

  id_user: string ;
  user_img_url_recent: string ;
  user: User_Model ;
  image_selected : File ;
  update_profil_form : FormGroup ;
  error_password: string ;


  constructor(  private form_builder: FormBuilder ,
                private mat_dialog: MatDialog ,
                private active_route: ActivatedRoute ,
                private user_service: UserService )
  {}

  ngOnInit()
  {
    this.error_password = null ;
    this.id_user = this.active_route.snapshot.params["id_user"] ;

    this.update_profil_form = new FormGroup({
      nom: new FormControl() ,
      prenom: new FormControl() ,
      image: new FormControl() ,
      password: new FormControl() ,
      confirm_password: new FormControl()
    });

    this.user_service.get_by_id( this.id_user ).subscribe( ( response ) =>
    {
      this.user = response ;
      this.user_img_url_recent = this.user.img_url ;

      this.update_profil_form = this.form_builder.group({
        nom: [ this.user.nom , [ Validators.required ] ] ,
        prenom: [ this.user.prenom , [ Validators.required ] ] ,
        image: [ null ] ,
        password: [ null , [ Validators.required ] ] ,
        confirm_password: [ null , [ Validators.required ] ]
      } , );

    } ) ;
  }

  on_image_selected(event)
  {
    this.image_selected = event.target.files[0] ;
  }


  check_user()
  {
    const data_user = new FormData() ; 
    data_user.append("_id" , this.id_user ) ;
    data_user.append("nom" , this.update_profil_form.value.nom ) ;
    data_user.append("prenom" , this.update_profil_form.value.prenom ) ;
    data_user.append("password" , this.update_profil_form.value.password ) ;

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

    if( this.update_profil_form.value.password !== this.update_profil_form.value.confirm_password )
    {
      this.error_password = "Veuillez bien confirmer votre nouveau mot de passe"
    }
    else
    {
      const data = {
        image_url: image_url ,
        data_user : data_user ,
      }
      this.mat_dialog.open( DialogUpdateProfileComponent , { width: "1000px" , data: data } );
    }
  }

  reset_update_profile_form()
  {
    this.update_profil_form = this.form_builder.group({
      nom: [ this.user.nom , [ Validators.required ] ] ,
      prenom: [ this.user.prenom , [ Validators.required ] ] ,
      image: [ null ] ,
      password: [ null , [ Validators.required ] ] ,
      confirm_password: [ null , [ Validators.required ] ]
    });
  }



}
