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
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";

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
    MatProgressSpinner,
    CdkDropListGroup, CdkDropList, CdkDrag
  ],
  templateUrl: './matieres.component.html',
  styleUrl: './matieres.component.css'
})

export class MatieresComponent implements OnInit{
  loader: boolean ;

  isAdmin: boolean ;

  matieres: MatieresModel[] = [];
  deletedMatieres: MatieresModel[]= [];


  enseignants: Map<string, any> = new Map();

  showLoading: boolean = false;


  constructor(
    private toastr: ToastrService,
    private matieresService: MatieresService,
    private mat_dialog: MatDialog ,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loader = true
    this.getAllMatieres("");
    // Liste des matieres supprimees
    this.getAllMatieresDeleted();
    this.isAdmin = this.authService.isAdmin();
    this.loader = false ;
  }

  getAllMatieresDeleted(): void {
    this.matieresService.getMatiereSupprimees().subscribe((response:any) => {
      if (response.data) {
        this.deletedMatieres = response.data;
      }else {
        this.deletedMatieres = []; // Vide si la liste est vide
      }
      this.loader = false ;
    });
  }

  getAllMatieres( enseignant_id: string ): void{
    this.matieresService.getAllMatieres( enseignant_id ).subscribe(
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
          this.getAllMatieresDeleted();
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

  // Restaurer une matiere supprimee par un drag and drop
  drop(event: CdkDragDrop<MatieresModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedMatiere = event.previousContainer.data[event.previousIndex];
      if (event.container.id === 'matieresList') {
        // Afficher une confirmation avant de restaurer la matiere
        const dialogRef = this.mat_dialog.open(ConfirmDialogComponent, {
          width: '35%',
          data: { nom: movedMatiere.nom , dateDeleted: movedMatiere.deletedAt }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            const formData = new FormData();
            formData.append('nom', movedMatiere.nom);
            formData.append('imageMatiere', movedMatiere.imageMatiere);
            formData.append('idProf', movedMatiere.idProf);
            formData.append('deletedAt', "");
            formData.append('deleted', String(false));

            this.matieresService.updateMatiere(movedMatiere.id, formData).subscribe(
              (response: any) => {
                if (response.errors && response.status === 400) {
                  this.toastr.error(response.errors, 'Erreur');
                }else {
                  this.getAllMatieres("");
                  this.getAllMatieresDeleted();
                  this.toastr.success('La matière ' + movedMatiere.nom + ' a été restaurée!', 'Success');
                }
              },
              (error) => {
                console.error(error);
              }
            );
          }
        });
      }
    }
  }
}
