import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { EventBusService } from './shared/event-bus.service';
import { Cart } from './models/shopping-cart';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductsService } from './services/products.service';
import { Products } from './models/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Output() productSelected = new EventEmitter<Products>();
  carts?: Cart[]=[];
  currentIndex = -1;
  dataCount =0;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string; 
  eventBusSub?: Subscription;
  products?: Products[];

  data: Products[] = [];
  filteredData: Products[] = [];
  currentUser: Products = {
    id: undefined,
    name: '',
    amount: 0,
    price: 0
  };


  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private slService: ShoppingCartService,
    private apiService: ProductsService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

    this.carts = this.slService.getIngredients();
    this.slService.cartsChanged
      .subscribe(
        (carts: Cart[]) => {
          this.carts = carts; 
          this.dataCount = this.carts.length;
        }
      );

    this.apiService.getAll()
    .subscribe({
      next: (data) => {
        this.data = data;
      this.filteredData = data;

        console.log(data);
      },
      error: (e) => console.error(e)
    });
     
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

 

  
  searchQuery: string = '';

search(event: Event): void {
  this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
  if (this.searchQuery) {
    this.filteredData = this.data.filter(item =>
      item.name && item.name.toLowerCase().startsWith(this.searchQuery)
    );
  } else {
    this.filteredData = []; 
  }
}

  
  onSelect(product: Products): void {
    this.productSelected.emit(product);
    console.log('Kiválasztott termék:', product);
  }
  
}
