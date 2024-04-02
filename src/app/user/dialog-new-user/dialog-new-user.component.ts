import { Component, Inject, OnInit } from '@angular/core';
import { User_Model } from '../user.model';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-new-user',
  standalone: true,
  imports: [
    CommonModule ,
    MatDialogModule ,
    MatButtonModule ,
    MatIconModule ,
    MatProgressSpinnerModule
  ],
  templateUrl: './dialog-new-user.component.html',
  styleUrl: './dialog-new-user.component.css'
})
export class DialogNewUserComponent implements OnInit{

  data_user: FormData ;
  img_url: string ;

  hidden_buttons: boolean ;
  is_loading: boolean ;
  message_success: string ;
  message_error: string ;

  constructor(  private dialog_ref: DialogRef ,
                @Inject( MAT_DIALOG_DATA ) public data: any ,
                private user_service: UserService ,
                private router: Router ) { }

  ngOnInit(): void
  {
    this.data_user = this.data.data_user ;
    this.img_url = this.data.image_url ;

    this.hidden_buttons = false ;
  }

  add_user()
  {
    this.is_loading =  true ;
    this.hidden_buttons = true ;

    this.user_service.create(this.data_user).subscribe( (response) =>
    {
      if( response.created === false )
      {
        setTimeout(() =>
          {
            this.is_loading = false;
            this.message_error = response.message;
            setTimeout( () =>
            {
              this.dialog_ref.close() ;
              this.router.navigate([ "/add-user" ]) ;
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
              this.router.navigate([ "/add-user" ]) ;
            } , 1000 ); // Redirection après 1 seconde
          } , 2000 ); // Message de succès affiché pendant 2 secondes
      }
    } ) ;
  }

}
