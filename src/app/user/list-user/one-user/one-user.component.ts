import { Component, Input } from '@angular/core';
import { User_Model } from '../../user.model';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-one-user',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './one-user.component.html',
  styleUrl: './one-user.component.css'
})
export class OneUserComponent
{
  constructor( private router: Router ) {}
  @Input()
  utilisateur: User_Model ;

  show_utilisateur()
  {
    this.router.navigate(["/user/" + this.utilisateur._id ]) ;
  }
}
