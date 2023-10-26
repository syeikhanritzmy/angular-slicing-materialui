import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './product-list/products.component';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import { DeleteProductModalComponent } from './delete-product-modal/delete-product-modal.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [
    AddProductModalComponent,
    ProductsComponent,
    DeleteProductModalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    ClarityModule,
  ],
  exports: [ProductsComponent],
})
export class ProductsModule {}
