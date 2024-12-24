import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationFormsService} from "../../../../service/validation-forms.service";

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.scss'
})
export class UpdateModalComponent {
  @Input() stock: any = null;
  loading: boolean = true;
  updateForm!: FormGroup;
  submitted: boolean = false;
  formErrors: any;
  formControls!: string[];
  modalVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public validationFormsService: ValidationFormsService
  ) {
    this.formErrors = this.validationFormsService.stockUpdateErrorMessages;
    this.createForm();
  }

  createForm() {
    this.updateForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        stopLoss: ['', [Validators.required]],
        maxGain: ['', [Validators.required]],
        buyTarget: ['', [Validators.required]],
        sellTarget: ['', [Validators.required]],
        buyZone: ['', [Validators.required]],
        image: ['', [Validators.required]],
      }
    );
    this.formControls = Object.keys(this.updateForm.controls);
  }

  setFormValues(stock: any) {
    console.log('stock: ' + stock.value);
    this.updateForm.patchValue({
      name: stock.name || '',
      description: stock.description || '',
      stopLoss: stock.stopLoss || '',
      maxGain: stock.maxGain || '',
      buyTarget: stock.buyTarget || '',
      sellTarget: stock.sellTarget || '',
      buyZone: stock.buyZone || '',
      image: stock.image || '',
    });
    console.log(this.updateForm.value);
  }

  updateStocks() {

  }

  open() {
    this.setFormValues(this.stock);
    this.modalVisible = true;
  }

  close() {
    this.modalVisible = false;
  }
}
