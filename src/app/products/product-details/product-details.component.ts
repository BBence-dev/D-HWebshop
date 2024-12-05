import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/products';
import { Cart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  private carts: Cart[] = [];
  products?: Products[];

  @Input() viewMode = false;

  @Input() currentProduct: Products = {
    id: undefined,
    name: '',
    amount: 0,
    price: 0,
  };

  currentIndex = -1;

  constructor(
    private apiService: ProductsService,
    private route: ActivatedRoute,
    private slService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.loadProducts(this.route.snapshot.params['id']);
    }
  }

  loadProducts(id: string): void {
    this.apiService.get(id).subscribe({
      next: (data) => {
        this.currentProduct = {
          ...data,
          availableAmount: data.amount, 
          amount: 0 
        };
        console.log(this.currentProduct);
      },
      error: (e) => console.error(e)
    });
  }
  
  getMaxAmount(product: Products): number {
    return product.availableAmount ?? 0; 
  }

  onAddItem(carts:any) {
    this.slService.addIngredient(carts);
  }
}
