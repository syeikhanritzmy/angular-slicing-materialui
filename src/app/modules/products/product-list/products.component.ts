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
  isAddModalOpen: boolean = false;
  // isEditModalOpen: boolean = false;
  editProductData: IProduct | null = null;
  selectedProduct: any;

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
  isAddModalOpenApp() {
    return this.isAddModalOpen;
  }
  closeAddModal(event: boolean) {
    this.isAddModalOpen = false;
  }
  closeEditModal(event: boolean) {
    // this.isEditModalOpen = false;
    this.editProductData = null;
  }
  toggleAddModal(product?: any) {
    this.isAddModalOpen = !this.isAddModalOpen;
    console.log(product);
    if (product) {
      this.selectedProduct = product;
    }
  }
  getProducts() {
    this.productServices.getProducts().subscribe((products) => {
      const filterProduct = products.filter((item, index) => index < 5);

      this.dataSource.data = filterProduct;
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
  // editProduct(product: IProduct) {
  //   this.editProductData = { ...product };
  //   this.isEditModalOpen = true;
  //   this.productId = product.id; // Simpan ID produk ke dalam properti
  // }
}
