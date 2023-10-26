import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteProductModalComponent {
  @Input() isDeleteModalOpen: boolean = false;
  @Output() onCancelDelete: EventEmitter<void> = new EventEmitter();
  @Output() onConfirmDelete: EventEmitter<void> = new EventEmitter();

  cancelDelete() {
    this.onCancelDelete.emit();
  }

  confirmDelete() {
    this.onConfirmDelete.emit();
  }
}
