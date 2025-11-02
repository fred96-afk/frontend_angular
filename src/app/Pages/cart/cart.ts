import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../Service/cart.service';
import { OrderService } from '../../Service/order.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
  }

  placeOrder(): void {
    const order = {
      items: this.cartItems.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    };

    this.orderService.createOrder(order).subscribe(() => {
      this.cartService.clearCart();
      Swal.fire({
        icon: 'success',
        title: 'Pedido Realizado',
        text: 'Tu pedido ha sido realizado exitosamente.'
      }).then(() => {
        this.router.navigate(['/']);
      });
    });
  }
}
