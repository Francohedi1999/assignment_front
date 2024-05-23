import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Note_Model } from '../../note.model';
import { User_Model } from '../../../user/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-on-note',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './on-note.component.html',
  styleUrl: './on-note.component.css'
})
export class OnNoteComponent implements OnInit
{

  constructor(  // private router: Router ,
                private user_service: UserService ) {}

  @Input()
  note: Note_Model ;

  etudiant: User_Model ;


  ngOnInit()
  {
    this.user_service.get_by_id( this.note.etudiant_id ).subscribe(
    (response: User_Model) =>
    {
      this.etudiant = response ;
    });
  }

}
