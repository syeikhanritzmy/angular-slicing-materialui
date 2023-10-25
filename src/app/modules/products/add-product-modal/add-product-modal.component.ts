import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductModalComponent implements OnInit {
  @Input() product: any; // kalau misalanya dari lempar data product berfungsi sebagai edit,kalau user dirender sebagai add new product
  @Output() outputData = new EventEmitter();
  @Input() isModalOpen: boolean = false;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      active: [false],
      expirationDate: [new Date(), Validators.required],
      description: '',
      type: ['tablet'],
      features: this.formBuilder.array([
        this.formBuilder.group({
          name: [''], // Setiap elemen dalam form array memiliki form control "name"
        }),
      ]),
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }
  get showNameRequiredError() {
    return (
      this.productForm.get('name')?.hasError('required') &&
      !this.productForm.get('name')?.pristine
    );
  }

  get isExpirationInvalid(): boolean {
    return this.productForm.get('expirationDate')!?.invalid;
  }

  get basicFeatures(): FormArray {
    return this.productForm.get('features') as FormArray;
  }

  handleFinish() {
    this.outputData.emit(this.productForm.value);
    this.closeModal.emit(false);
  }

  addFeature() {
    const features = this.productForm.get('features') as FormArray;
    features.push(this.formBuilder.control(''));
  }
  removeFeature(index: number) {
    this.basicFeatures.removeAt(index);
  }
  close() {
    this.closeModal.emit(false);
  }
}
