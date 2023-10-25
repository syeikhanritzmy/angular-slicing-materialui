import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IProduct } from '../products.model';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductModalComponent {
  @Input() productData: IProduct | null = null;
  @Input() productId: number | null = null;
  @Output() saveChanges = new EventEmitter<IProduct>();
  @Output() updateProductId = new EventEmitter<number>();
  @Output() closeModal = new EventEmitter();

  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      active: [true],
      expirationDate: ['', Validators.required],
      description: '',
      type: ['tablet'],
      features: formBuilder.array(['']),
    });
  }

  ngOnChanges() {
    if (this.productData) {
      this.productForm.patchValue(this.productData);
    }
  }

  handleSave() {
    if (this.productForm.valid) {
      if (this.productId !== null) {
        // Pastikan ID produk ada sebelum mengirimkannya
        this.updateProductId.emit(this.productId); // Kirim ID produk
      }
      this.saveChanges.emit(this.productForm.value);
    }
  }

  handleClose() {
    this.closeModal.emit();
  }
}
