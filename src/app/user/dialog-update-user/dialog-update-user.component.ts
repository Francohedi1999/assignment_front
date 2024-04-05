import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dialog-update-user',
  standalone: true,
  imports: [
    CommonModule ,
    MatDialogModule ,
    MatButtonModule ,
    MatIconModule ,
    MatProgressSpinnerModule
  ],
  templateUrl: './dialog-update-user.component.html',
  styleUrl: './dialog-update-user.component.css'
})
export class DialogUpdateUserComponent implements OnInit
{
  data_user: FormData ;
  img_url: string ;

  hidden_buttons: boolean ;
  is_loading: boolean ;
  message_success: string ;
  message_error: string ;

  constructor(  private dialog_ref: DialogRef ,
                @Inject( MAT_DIALOG_DATA ) public data: any ,
                private user_service: UserService ,
                private router: Router) {}

  ngOnInit(): void
  {
    this.data_user = this.data.data_user ;
    this.img_url = this.data.image_url ;
  }

  update_user()
  {

  }
}
