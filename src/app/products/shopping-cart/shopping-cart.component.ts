import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Orderervice } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { StorageService } from 'src/app/services/storage.service';
import { Order } from 'src/app/models/orders';
import { Cart } from 'src/app/models/shopping-cart';
import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: Products[] = [];
  carts: Cart[] = [];
  subTotal!: any;
  isLoggedIn = false;
  currentUser: any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  cartsChanged = new EventEmitter<Cart[]>();

  @Input() currentProducts: Order = {
    id: '',
    name: '',
    payment: '',
    amount: 0,
    price: 0,
    zip: 0,
    state: '',
    city: '',
    cardn: 0,
    expd: 0,
    cvv: 0,
    payed: '',
    delivery: ''
  };

  constructor(
    private slService: ShoppingCartService,
    private storageService: StorageService,
    private orderService: Orderervice,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.carts = this.slService.getIngredients();
    this.productService.getAll().subscribe((products: Products[]) => { this.products = products; });
    this.slService.cartsChanged.subscribe((carts: Cart[]) => {
      this.carts = carts;
    });
  }

  onCreateOrder() {
    this.currentProducts.name = this.currentUser.username;
    this.currentProducts.amount = this.totalQuantity;
    this.currentProducts.price = this.total;
  
    if ((this.currentProducts.payment || '').toLowerCase() === 'kártya') {
      this.currentProducts.payed = 'fizetve';
    } else {
      this.currentProducts.payed = 'utánvétel';
    }
  
    if (this.totalQuantity !== 0 && this.total !== 0) {
      this.orderService.create(this.currentProducts).subscribe({
        next: (res: any) => {
          console.log('Order created:', res);
  
          this.carts.forEach((cart) => {
            this.updateProduct(cart.id, cart.amount);
          });
  
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.slService.clearCart();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    }
  }
  

  updateProduct(productId: string, amount: number): void { const product = this.products.find(p => p.id === productId); if (product && product.amount !== undefined) { const updatedProduct: Products = { ...product, amount: product.amount - amount }; this.productService.update(productId, updatedProduct).subscribe({ next: (res) => { console.log('Updated product:', res); const index = this.products.findIndex(p => p.id === productId); if (index !== -1) { this.products[index].amount = updatedProduct.amount; } }, error: (e) => console.error(e) }); } else { console.error('Product not found or amount is undefined.'); } }
  

  clearAllProducts() {
    this.carts = [];
    this.slService.clearCart();
  }

  removeProduct(cart: any) {
    this.slService.removeProduct(cart);
    this.carts = this.slService.getIngredients();
  }

  getMaxAmount(cart:Cart): number { 
    return cart.availableAmount ?? 0; 
  }

  clearProducts() {
    localStorage.clear();
  }

  get total() {
    return this.carts?.reduce(
      (sum, product) => ({
        quantity: 1,
        prices: sum.prices + product.price * product.amount
      }),
      { quantity: 1, prices: 0 }
    ).prices;
  }

  get totalQuantity() {
    return this.carts?.reduce((total, product) => total + product.amount, 0);
  }
}
