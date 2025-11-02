import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Service/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css'],
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }
}
