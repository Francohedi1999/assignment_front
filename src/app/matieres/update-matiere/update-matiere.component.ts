import {Component, OnInit} from '@angular/core';
import {MatieresModel} from "../../models/matieres.model";
import {MatieresService} from "../../services/matieres.service";
import {Subscription} from "rxjs";
import { UserService } from '../../services/user.service';
import {User_Model} from "../../user/user.model";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { MatSpinner } from '@angular/material/progress-spinner';
import {
  DialogUpdateProfileComponent
} from "../../user/update-profile/dialog-update-profile/dialog-update-profile.component";
import {MatIcon} from "@angular/material/icon";
import {MatError} from "@angular/material/form-field";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-update-matiere',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatSpinner,
    MatIcon,
    MatError
  ],
  templateUrl: './update-matiere.component.html',
  styleUrl: './update-matiere.component.css'
})
export class UpdateMatiereComponent implements OnInit {
  idMatiere: string;

  matiere: MatieresModel | undefined;
  enseignant: User_Model[];
  updateMatiereForm : FormGroup ;

  selectedProf: string;
  selectedImage : File ;
  img_url_recent: string ;

  alertMessages: string[] = [];
  alertType: string = "";


  showLoading: boolean = false;
  showSuccess: boolean = false;

  private routeSubscription: Subscription;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private matiereService: MatieresService,
    private form_builder: FormBuilder ,
    private route: ActivatedRoute,
    private user_service: UserService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params
      .subscribe(params => {
        this.idMatiere = this.route.snapshot.params['id']; // Id de la matiere sur l'URL

        this.updateMatiereForm = new FormGroup({
          nom: new FormControl(),
          imageMatiere: new FormControl(),
          idProf: new FormControl()
        });

        this.matiereService.getMatiereById(this.idMatiere)
          .subscribe((response:any) => {
            console.log("Données de la matière :", response);

            this.matiere = response.data; // Access aux data de la matiere
            this.img_url_recent = this.matiere.imageMatiere ;

            // Mise à jour des champs du formulaire
            this.updateMatiereForm = this.form_builder.group({
              nom: [ this.matiere.nom , [ Validators.required ] ] ,
              imageMatiere: [ null ] ,
              idProf: [ this.matiere.idProf , [ Validators.required ] ]
            } , );
          });

      let role: string = "Enseignant";
      this.getAllProf(role); // A revoir elle doit etre dynamique!!!
    });
  }

  getAllProf( filtre: string )
  {
    this.user_service.get_all_no_pagination( filtre ).subscribe( ( response ) =>
    {
      this.enseignant = response ;
    } ) ;
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file && this.isImage(file)) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.img_url_recent = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.toastr.error('Veuillez sélectionner une image valide (JPG, JPEG, PNG)', 'Erreur');
    }
  }

  // Vérifier si le fichier est une image (JPG, JPEG, PNG)
  isImage(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return allowedTypes.includes(file.type);
  }



  onSaveMatiere() {
    if (!this.matiere) return;
    if (this.updateMatiereForm.invalid) return;
    const formData = new FormData();
    formData.append('nom', this.updateMatiereForm.value.nom);
    formData.append('idProf', this.updateMatiereForm.value.idProf);

    if (this.selectedImage) {
      formData.append('imageMatiere', this.selectedImage);
    }


    const id = this.matiere.id;
    this.alertMessages = [];
    this.alertType = "";
    this.showLoading = true;

    setTimeout(() => {
      this.matiereService.updateMatiere(id, formData).subscribe(
      (response: any) => {
        if (response.errors && response.status === 400) {
          this.showLoading = false;
          this.alertMessages.push(response.errors);
          this.alertType = "danger";
        } else {
          this.showLoading = false;
          this.toastr.success(response.message, 'Success');
          this.router.navigate(["/matieres"]);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );}, 1000);



  }

}
