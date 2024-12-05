import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Order } from '../models/orders';
import { Orderervice } from '../services/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  isListView: boolean = true;
  message = '';
  currentIndex = -1;
  submitted = false;

  nev='';


  Orders: Order[] = [];

currentOrders: Order = {
    name: '',
    payment:'',
    city:'',
    state:'',
    zip:0,
    payed:'',
    amount: 0,
    price: 0,
    delivery:'',
    ddelivery: new Date(0),
    status:''
  };

  constructor(private storageService: StorageService,
    private userService: UserService,
    private router: Router,
    private orderService: Orderervice
  ) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.loadOrders();
  }
  

  refreshList(): void {
    this.loadOrders();
    this.currentOrders = {
      name: '',
      payment:'',
      city:'',
      state:'',
      zip:0,
      payed:'',
      amount: 0,
      price: 0,
      delivery:'',
      ddelivery: new Date(0),
      status:''
    };
    this.currentIndex = -1;
  }

  loadOrders(): void {
    this.orderService.findByName(this.currentUser.username ).subscribe({
      next: (data) => {
        this.Orders = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updateUser(): void {
    this.message = '';

    this.userService
      .update1(this.currentUser.id, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'Error szöveg';
        },
        error: (e) => console.error(e)
      });
  }

  
  deleteUser(): void {
    this.userService.delete(this.currentUser.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['home']);
      },
      error: (e) => console.error(e)
    });
  }
}
