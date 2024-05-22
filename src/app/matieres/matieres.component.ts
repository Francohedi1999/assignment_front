import {Component, OnInit} from '@angular/core';
import {MatieresModel} from "../models/matieres.model";
import {MatieresService} from "../services/matieres.service";
import {CommonModule} from "@angular/common";
import {OneUserComponent} from "../user/list-user/one-user/one-user.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTable} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {User_Model} from "../user/user.model";
import {UserService} from "../services/user.service";

import {DialogNewUserComponent} from "../user/new-user/dialog-new-user/dialog-new-user.component";
import {MatDialog} from "@angular/material/dialog";
import {AddMatiereComponent} from "./add-matiere/add-matiere.component";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AuthService} from "../services/auth.service";

const ADMINISTRATEUR = 'Administrateur';


@Component({
  selector: 'app-matieres',
  standalone: true,
  imports: [
    CommonModule,
    OneUserComponent,
    MatButtonToggleModule,
    ToastrModule,
    MatTable,
    MatIcon,
    RouterLink,
    MatProgressSpinner
  ],
  templateUrl: './matieres.component.html',
  styleUrl: './matieres.component.css'
})

export class MatieresComponent implements OnInit{
  isAdmin: boolean ;

  matieres: MatieresModel[];
  enseignant: User_Model[];

  showLoading: boolean = false;


  constructor(
    private toastr: ToastrService,
    private matieresService: MatieresService,
    private mat_dialog: MatDialog ,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllMatieres("");
    this.isAdmin = this.authService.isAdmin();
  }

  getAllMatieres(filtre: string): void{
    this.matieresService.getAllMatieres(filtre).subscribe(
      (response: any) => {
        console.log(response.message); // Affiche le message dans la console
        if (response.data) {
          this.matieres = response.data; // Enregistre les donnees dans la variable matieres
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des matières : ', error);
      }
    );
  }

  addNewMatiere(): void{
    const dialogRef = this.mat_dialog.open( AddMatiereComponent , {
      width: '40%',
      data:{
        title: "Ajout d' une nouvelle matiere"
      }
    } );
    dialogRef.afterClosed().subscribe((result) => {
        this.getAllMatieres("");
    });
  }


  deleteMatiere(id: string, nom: string) {
    this.showLoading = true;
    setTimeout(() => {
      this.matieresService.deleteMatiere(id).subscribe((response) => {
          this.showLoading = false;
          this.toastr.success('La matiere '+ nom +' a ete supprimer!', 'Success');
          this.getAllMatieres("");
        },
        (error: any) => {
        // Si le serveur retourne une erreur status 403
        if (error.status === 403) {
          // Rediriger vers la page d'erreur 403
          this.router.navigate(['/access-denied']);
        }
          console.error(error);
        });
    }, 350);
  }
}
