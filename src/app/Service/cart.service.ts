import { Injectable } from '@angular/core';
import { products } from '../Model/products';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartItem {
  product: products;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartSubject.next(JSON.parse(storedCart));
    }
  }

  getCart(): CartItem[] {
    return this.cartSubject.getValue();
  }

  getCartItemCount(): Observable<number> {
    return this.cart$.pipe(
      map(cart => cart.reduce((acc, item) => acc + item.quantity, 0))
    );
  }

  addToCart(product: products): void {
    const currentCart = this.getCart();
    const existingItem = currentCart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentCart.push({ product, quantity: 1 });
    }
    this.cartSubject.next(currentCart);
    this.saveCart();
  }

  clearCart(): void {
    this.cartSubject.next([]);
    this.saveCart();
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.getCart()));
  }
}
