import { Component, Input } from '@angular/core';
import { User_Model } from '../user.model';
import { MatCardModule } from '@angular/material/card';

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
  @Input()
  utilisateur: User_Model ;

  show_utilisateur()
  {
    console.log( this.utilisateur ) ;
  }
}
