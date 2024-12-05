import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/products';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  products: Products[] = [];

  @Input() currentProducts: Products = {
    name: '',
    url:'',
    amount: 0,
    price: 0
  };

  message = '';
  currentIndex = -1;
  submitted = false;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  onDeleteProduct(id: any): void {
    this.productService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.loadProducts();
    this.currentProducts = {
      name: '',
      url:'',
      amount: 0,
      price: 0
    };
    this.currentIndex = -1;
  }
  onSubmit(orderForm: NgForm) {
    this.onCreateProduct();
  }
  
  onCreateProduct() {
    this.productService.create(this.currentProducts).subscribe({
      next: (res: any) => {
        console.log(res);
        this.refreshList();
      },
      error: (e: any) => console.error(e)
    });
  }
  
  
  updateProduct(id: any, products:Products): void {
    this.message = '';
    this.productService.update(id, products).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'Termék frissitése sikeres!';
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  newProduct(): void {
    this.currentProducts = {
      name: '',
      url:'',
      amount: 0,
      price: 0
    };
  }
}
function onCreateProduct() {
  throw new Error('Function not implemented.');
}

