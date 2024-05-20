import {Component, Inject, input, OnInit} from '@angular/core';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {UserService} from "../../services/user.service";
import {User_Model} from "../../user/user.model";
import {MatieresModel} from "../../models/matieres.model";
import {MatieresService} from "../../services/matieres.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ToastrService} from "ngx-toastr";
import {DialogRef} from "@angular/cdk/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-matiere',
  standalone: true,
  templateUrl: './add-matiere.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    MatIcon,
    MatButton,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatProgressSpinner
  ],
  styleUrl: './add-matiere.component.css'
})
export class AddMatiereComponent implements OnInit{
  enseignant: User_Model[];
  matiere: MatieresModel | undefined;

  alertMessages: string[] = [];
  alertType: string = "";
  showLoading: boolean = false;

  inputdata:any;
  selectedImage : File ;


  constructor(
    private router: Router,
    private dialog_ref: DialogRef ,
    private toastr: ToastrService,
    private matiereService: MatieresService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private ref:MatDialogRef<AddMatiereComponent>,
    private formBuilder: FormBuilder,
    private user_service: UserService
    ){}
  ngOnInit() {
    this.inputdata=this.data;
    let role: string = "enseignant";
    this.getAllProf(role);
  }

  addMatiereForm=this.formBuilder.group({
    imageMatiere: [ null , [ Validators.required ] ] ,
    nom: [ null , [ Validators.required ] ] ,
    idProf: [ null , [ Validators.required ] ]
  });

  getErrorMessage(controlName: string): string {
    const control = this.addMatiereForm.get(controlName);
    if (control.errors) {
      if (control.errors['required']) {
        return 'Ce champ est requis.';
      }
    }
    return '';
  }

  getAllProf( filtre: string )
  {
    this.user_service.get_all( filtre ).subscribe( ( response ) =>
    {
      this.enseignant = response ;
    } ) ;
  }

  SaveMatiere() {
    console.log(this.addMatiereForm.value);
    if (this.addMatiereForm.invalid) return;
    const formData = new FormData();
    formData.append('nom', this.addMatiereForm.value.nom);
    formData.append('idProf', this.addMatiereForm.value.idProf);
    formData.append('imageMatiere', this.selectedImage);

    this.alertMessages = [];
    this.alertType = "";
    this.showLoading = true;

    setTimeout(() => {
      this.matiereService.addMatiere(formData).subscribe(
        (response: any) => {
          if (response.errors && response.status === 400) {
            this.showLoading = false;
            this.alertMessages.push(response.errors);
            this.alertType = "danger";
          } else {
            this.showLoading = false
            this.toastr.success(response.message, 'Success');
              this.dialog_ref.close() ;
          }
        },
        (error: any) => {
          console.error(error);
        }
      );}, 500);

  }

  OnImageSelected(event)
  {
    this.selectedImage = event.target.files[0] ;
  }
}
