import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductServices } from '../products.service';
import { IProduct } from '../products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  length: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  pageSize: number = 5;
  displayedColumns: string[] = ['name', 'expiration_date', 'active', 'actions'];
  isModalOpen: boolean = false;

  isEditMode: boolean = false;
  selectedProduct: any;

  isDeleteModalOpen: boolean = false;
  selectedProductToDelete: any;

  constructor(private productServices: ProductServices) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<IProduct>();

  ngOnInit() {
    this.getProducts();
  }

  // ...
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // closeAddModal(event: boolean) {
  //   this.isModalOpen = false;
  // }

  toggleAddModal(product?: any) {
    console.log(this.isModalOpen);
    this.isModalOpen = true;
    if (product) {
      this.isEditMode = true;
      this.selectedProduct = product;
      console.log(this.selectedProduct);
    } else {
      this.selectedProduct = null;
    }
  }
  getProducts() {
    this.productServices.getProducts().subscribe((products) => {
      // const filterProduct = products.filter((item, index) => index);

      this.dataSource.data = products;
      this.dataSource.paginator = this.paginator;
      this.length = products.length;
    });
    console.log(this.productServices.getProducts());
  }
  addProduct(newProduct: IProduct) {
    // Dapatkan produk terakhir dalam daftar produk Anda
    const lastProduct = this.dataSource.data.slice(-1)[0];

    // Jika ada produk sebelumnya, tambahkan 1 untuk mendapatkan ID berikutnya.
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    // Setel ID produk baru
    newProduct.id = newId;

    // Tambahkan produk baru
    this.productServices.addProduct(newProduct);

    this.getProducts();
  }

  // deleteProduct(productId: number) {
  //   this.productServices.deleteProduct(productId);
  //   console.log(productId);
  // }
  deleteProductConfirmation(product: any) {
    this.selectedProductToDelete = product.id; // Simpan produk yang akan dihapus

    this.isDeleteModalOpen = true; // Tampilkan modal konfirmasi penghapusan
  }

  cancelDelete() {
    this.isDeleteModalOpen = false; // Sembunyikan modal konfirmasi penghapusan
  }

  confirmDelete() {
    this.productServices.deleteProduct(this.selectedProductToDelete);
    console.log(this.selectedProductToDelete);
    this.isDeleteModalOpen = false; // Sembunyikan modal konfirmasi penghapusan setelah penghapusan berhasil
  }
}
