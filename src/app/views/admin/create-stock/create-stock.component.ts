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
        // image: ['', [Validators.required]],
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
}
