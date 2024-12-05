import { Component} from '@angular/core';
import { Products } from '../models/products';
import { ProductsService } from '../services/products.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Cart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  private carts: Cart[] = [];

  products?: Products[];

currentProduct: Products = {
    id: undefined,
     name: '',
     amount:0,
     price:0
   };
   

currentIndex = -1;
 id='';
 nev='';
 db= 0;
 ar= 0

 constructor(private apiService: ProductsService,
  private slService:ShoppingCartService
 ) {
 }

 ngOnInit(): void {
  this.loadProducts();
}

loadProducts(): void { this.apiService.getAll().subscribe({ next: (data) => 
  { this.products = data.map(product => ({ ...product, 
    availableAmount: product.amount,
  amount: 0 })); 
  console.log(this.products); }, error: (e) => console.error(e) });}

  getMaxAmount(product: Products): number { 
    return product.availableAmount ?? 0; 
  }

onAddItem(carts:any) {
  this.slService.addIngredient(carts);
}

}
