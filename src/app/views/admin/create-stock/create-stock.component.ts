import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationFormsService} from "../../../service/validation-forms.service";
import {ApiService} from "../../../service/api.service";
import {finalize} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrl: './create-stock.component.scss'
})
export class CreateStockComponent {
  @Output() createChange = new EventEmitter<boolean>();
  createForm!: FormGroup;
  submitted: boolean = false;
  formErrors: any;
  formControls!: string[];
  selectedImage: { src: any; isLoading: boolean } = { src: null, isLoading: false };
  isUpdate = false; // To toggle the loading spinner
  submit = false; // Indicates if the form has been submitted

  constructor(
    private formBuilder: FormBuilder,
    public validationFormsService: ValidationFormsService,
    private apiService: ApiService,
    private toastr: ToastrService,
  ) {
    this.formErrors = this.validationFormsService.stockUpdateErrorMessages;
    this.initializeForm();
  }

  initializeForm() {
    this.createForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        stopLoss: ['', [Validators.required]],
        maxGain: ['', [Validators.required]],
        buyTarget: ['', [Validators.required]],
        sellTarget: ['', [Validators.required]],
        buyZone: ['', [Validators.required]],
        imageUrl: ['', [Validators.required]],
      }
    );
    this.formControls = Object.keys(this.createForm.controls);
  }

  createStock() {
    this.submitted = true;
    this.apiService.createStock(this.createForm.value)
      .pipe(finalize(() => this.submitted = false))
      .subscribe({
        next: value => {
          if (value?.statusCode === 200) {
            this.toastr.success('Stock created successfully');
            this.createForm.reset();
            this.createChange.emit();
          } else this.toastr.error('Stock creation failed. Try again');
        },
        error: err => {
          this.toastr.error('Stock creation failed. Try again');
        }
      })
  }

  // Reference to the file input
  triggerFileInput(ctrl: any): void {
    const fileInput = document.getElementById('upload') as HTMLInputElement;
    fileInput.click(); // Simulate a click on the file input
    ctrl.markAsTouched();
  }

  // Handle Drag Over
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  // Handle Drag Leave
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  // Handle File Drop
  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  // Handle File Selection
  onFileSelected(event: Event, ctrl: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(input.files);
    }
    ctrl.markAsTouched();
  }

  // Process Selected Files
  processFiles(files: FileList): void {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      const imageInfo = { src: '', isLoading: true };

      reader.onload = () => {
        imageInfo.src = reader.result as string;
        imageInfo.isLoading = false;
      };

      reader.readAsDataURL(file);
      this.selectedImage = imageInfo;
      this.createForm.controls['imageUrl'].setValue(file);
    });
  }

  // Remove Image
  removeImage(event: Event): void {
    event.stopPropagation();
    console.log('Remove image clicked');
    this.selectedImage.src = null;
    this.createForm.controls['imageUrl'].setValue('');
  }
}
