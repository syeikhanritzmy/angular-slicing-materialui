import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from './products.model';
@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  private productsSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject<
    IProduct[]
  >([]);
  products$: Observable<IProduct[]> = this.productsSubject.asObservable();

  constructor() {
    this.initializeData();
  }
  private initializeData() {
    const DataProducts: IProduct[] = [
      {
        id: 1,
        name: 'Product 1',
        active: true,
        expirationDate: '2023-12-31',
        description: 'Description for Product 1',
        type: 'tablet',
        features: [{ name: 'sidjasi' }],
      },
      {
        id: 2,
        name: 'Product 2',
        active: false,
        expirationDate: '2023-11-15',
        description: 'Description for Product 2',
        type: 'laptop',
        features: [{ name: 'sidjasiffff' }],
      },
      {
        id: 3,
        name: 'Product 3',
        active: false,
        expirationDate: '2023-12-15',
        description: 'Description for Product 3',
        type: 'handphone',
        features: [{ name: 'sidjasibvbvb' }],
      },

      {
        id: 4,
        name: 'Product 4',
        active: false,
        expirationDate: '2023-11-18',
        description: 'Description for Product 4',
        type: 'tablet',
        features: [{ name: 'sidjasiasas' }],
      },

      {
        id: 5,
        name: 'Product 5',
        active: true,
        expirationDate: '2023-11-20',
        description: 'Description for Product 5',
        type: 'laptop',
        features: [{ name: 'sidjasidfdfdf' }],
      },

      {
        id: 6,
        name: 'Product 6',
        active: true,
        expirationDate: '2023-11-21',
        description: 'Description for Product 6',
        type: 'handphone',
        features: [{ name: 'sidjasiytyt' }],
      },
    ];
    this.productsSubject.next(DataProducts);
  }

  addProduct(product: IProduct) {
    const currentProducts = this.productsSubject.value;
    const updatedProducts = [...currentProducts, product];
    this.productsSubject.next(updatedProducts);
  }

  getProducts(): Observable<IProduct[]> {
    return this.products$;
  }
  editProduct(updatedProduct: IProduct) {
    const currentProducts = this.productsSubject.value;
    const productIndex = currentProducts.findIndex(
      (p) => p.id === updatedProduct.id
    );
    if (productIndex !== -1) {
      currentProducts[productIndex] = updatedProduct;
      this.productsSubject.next(currentProducts);
    }
  }
  deleteProduct(productId: number) {
    const currentProducts = this.productsSubject.value;
    const updatedProducts = currentProducts.filter(
      (product) => product.id !== productId
    );
    this.productsSubject.next(updatedProducts);
  }
}
