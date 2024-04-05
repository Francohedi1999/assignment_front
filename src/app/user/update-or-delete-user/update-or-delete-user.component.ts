import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { DialogNewUserComponent } from '../dialog-new-user/dialog-new-user.component';
import { ActivatedRoute } from '@angular/router';
import { User_Model } from '../user.model';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { LevelService } from '../../services/level.service';
import { DialogUpdateUserComponent } from '../dialog-update-user/dialog-update-user.component';

@Component({
  selector: 'app-update-or-delete-user',
  standalone: true,
  imports: [
    CommonModule ,
    MatButtonModule ,
    MatIconModule ,
    MatInputModule ,
    MatDialogModule,
    MatMenuModule ,
    FormsModule ,
    MatDatepickerModule ,
    MatNativeDateModule ,
    ReactiveFormsModule ,
    MatSelectModule
  ],
  templateUrl: './update-or-delete-user.component.html',
  styleUrl: './update-or-delete-user.component.css'
})
export class UpdateOrDeleteUserComponent implements OnInit
{
  id_user: string ;
  user_img_url_recent: string ;
  user: User_Model ;

  image_selected : File ;

  error_niveau: string ;

  roles: any[];
  levels: any[];

  update_user_form : FormGroup ;

  constructor(  private form_builder: FormBuilder ,
                private mat_dialog: MatDialog ,
                private active_route: ActivatedRoute ,
                private user_service: UserService ,
                private role_service: RoleService ,
                private level_service: LevelService)
  { }

  ngOnInit(): void
  {
    this.roles = this.role_service.roles ;
    this.levels = this.level_service.levels ;

    this.id_user = this.active_route.snapshot.params["id_user"] ;

    this.update_user_form = new FormGroup({
      nom: new FormControl() ,
      prenom: new FormControl() ,
      email: new FormControl() ,
      role: new FormControl() ,
      niveau: new FormControl() ,
      image: new FormControl() ,
    });

    this.user_service.get_by_id( this.id_user ).subscribe( ( response ) =>
    {
      this.user = response ;
      this.user_img_url_recent = this.user.img_url ;

      this.update_user_form = this.form_builder.group({
        nom: [ this.user.nom , [Validators.required]],
        prenom: [ this.user.prenom , [Validators.required]],
        email: [ this.user.email , [Validators.required, Validators.email]],
        role: [ this.user.role , [Validators.required, Validators.pattern("^(Administrateur|Enseignant|Etudiant)$")]],
        niveau: [ this.user.niveau || null , Validators.pattern("^(L1|L2|L3|M1|M2)$")] ,
        image: [ null ]
      });

    } ) ;

  }

  check_user()
  {
    const data_user = new FormData() ;

    data_user.append("nom" , this.update_user_form.value.nom ) ;
    data_user.append("prenom" , this.update_user_form.value.prenom ) ;
    data_user.append("email" , this.update_user_form.value.email ) ;
    data_user.append("role" , this.update_user_form.value.role ) ;
    data_user.append("niveau" , this.update_user_form.value.niveau ) ;

    let image_url = "" ;
    if( this.image_selected )
    {
      image_url = URL.createObjectURL( this.image_selected ) ;
    }
    else
    {
      image_url = this.user_img_url_recent ;
    }

    if( this.update_user_form.value.role !== "Etudiant" && this.update_user_form.value.niveau !== null )
    {
      this.error_niveau = "Seuls les étudiants peuvent avoir un niveaux" ;
    }
    else
    {
      const data = {
        image_url: image_url ,
        data_user : data_user ,
      }
      this.mat_dialog.open( DialogUpdateUserComponent , { width: "1000px" , data: data } );
    }
  }

  on_image_selected(event)
  {
    this.image_selected = event.target.files[0] ;
  }

}
