import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule ,
    ReactiveFormsModule ,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit
{
  mailDefault: string = 'administrateur@gmail.com';
  passwordDefault: string = '0000';

  constructor( private form_builder: FormBuilder , private auth_service: AuthService ) {}

  login_form: FormGroup ;

  ngOnInit(): void
  {
    this.login_form = this.form_builder.group( {
      email: [ this.mailDefault , [ Validators.required , Validators.email ] ] ,
      password: [ this.passwordDefault , Validators.required ]
    } ) 
  }

  login()
  {
    this.auth_service.login( this.login_form.value.email , this.login_form.value.password ) ;
  }

}
