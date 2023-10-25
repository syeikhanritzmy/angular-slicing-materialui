import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteProductModalComponent {

}
