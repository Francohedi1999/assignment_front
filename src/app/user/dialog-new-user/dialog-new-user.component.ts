import { Component, Inject, OnInit } from '@angular/core';
import { User_Model } from '../user.model';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

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

  user: User_Model ;
  img_url: string ;

  constructor(  private dialog_ref: DialogRef ,
                @Inject( MAT_DIALOG_DATA ) public data: User_Model ) { }

  ngOnInit(): void
  {
    this.user = this.data ;
    this.img_url = URL.createObjectURL( this.user.image) ;
  }

}
