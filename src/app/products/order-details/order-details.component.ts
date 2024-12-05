import { Component, Input, OnInit } from '@angular/core';
import { Orderervice } from 'src/app/services/order.service';
import { Order } from 'src/app/models/orders';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  Orders: Order[] = [];

  @Input() currentOrders: Order = {
    name: '',
    payment: '',
    city: '',
    state: '',
    zip: 0,
    payed: '',
    amount: 0,
    price: 0,
    delivery: '',
    ddelivery: new Date(0),  // A ddelivery mezőt itt egy alapértelmezett dátummal inicializálom
    status: ''
  };


  message = '';
  currentIndex = -1;
  submitted = false;

  constructor(private orderService: Orderervice) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  onSubmit(orderForm: NgForm) {
    this.onCreateOrder();
  }
  

  onCreateOrder(): void {
    this.orderService.create(this.currentOrders).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  onDeleteOrder(id: string): void {
    this.orderService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.loadOrders();
    this.currentOrders = {
      name: '',
      payment: '',
      city: '',
      state: '',
      zip: 0,
      payed: '',
      amount: 0,
      price: 0,
      delivery: '',
      ddelivery: new Date(0),
      status: ''
    };
    this.currentIndex = -1;
  }

  updateOrder(id: string, orders: Order): void {
    this.message = '';
    this.orderService.update(id, orders).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'A rendelés frissítve lett';
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  loadOrders(): void {
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.Orders = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  newOrder(): void {
    this.currentOrders = {
      name: '',
      payment: '',
      city: '',
      state: '',
      zip: 0,
      payed: '',
      amount: 0,
      price: 0,
      delivery: '',
      ddelivery: new Date(0),
      status: ''
    };
  }
}
