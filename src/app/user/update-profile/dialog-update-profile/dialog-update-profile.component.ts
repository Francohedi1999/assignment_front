import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dialog-update-profile',
  standalone: true,
  imports: [
    CommonModule ,
    MatDialogModule ,
    MatButtonModule ,
    MatIconModule ,
    MatProgressSpinnerModule],
  templateUrl: './dialog-update-profile.component.html',
  styleUrl: './dialog-update-profile.component.css'
})
export class DialogUpdateProfileComponent implements OnInit
{
  data_user: FormData ;
  img_url: string ;

  hidden_buttons: boolean ;
  is_loading: boolean ;
  message_success: string ;
  message_error: string ;

  constructor(  private dialog_ref: DialogRef ,
                @Inject( MAT_DIALOG_DATA ) public data: any ,
                private user_service: UserService )
  {}

  ngOnInit()
  {
    this.data_user = this.data.data_user ;
    this.img_url = this.data.image_url ;

    this.hidden_buttons = false ;
  }

  update_user()
  {
    this.is_loading =  true ;
    this.hidden_buttons = true ;

    this.user_service.update_profil(this.data_user).subscribe( (response) =>
    {
      if( response.updated === false )
      {
        setTimeout(() =>
          {
            this.is_loading = false;
            this.message_error = response.message;
            setTimeout( () =>
            {
              this.dialog_ref.close() ;
              window.location.href = "list-user" ;
            } , 1000 ); // Redirection après 1 seconde
          } , 2000 ); // Message de succès affiché pendant 2 secondes
      }
      else
      {
        setTimeout(() =>
          {
            this.is_loading = false;
            this.message_success = response.message;
            setTimeout( () =>
            {
              this.dialog_ref.close() ;
              window.location.href = "list-user" ;
            } , 1000 ); // Redirection après 1 seconde
          } , 2000 ); // Message de succès affiché pendant 2 secondes
      }
    } ) ;
  }
}
