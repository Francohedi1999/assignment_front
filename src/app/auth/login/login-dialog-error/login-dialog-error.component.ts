import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { User_Model } from '../../../user/user.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-dialog-error',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './login-dialog-error.component.html',
  styleUrl: './login-dialog-error.component.css'
})
export class LoginDialogErrorComponent implements OnInit
{

  message_error_login: String ;


  constructor( @Inject(MAT_DIALOG_DATA) public data: String ) {}

  ngOnInit()
  {
    this.message_error_login = this.data ;
  }
}
