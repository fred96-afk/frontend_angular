import { Component, OnInit, OnDestroy } from '@angular/core';
import { products } from '../../Model/products';
import { ProductService } from '../../Service/product-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartService } from '../../Service/cart.service';
import { BannerService } from '../../Service/banner.service';
import { Banner } from '../../Model/banner';
import { SnackbarService } from '../../Service/snackbar.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  productos: products[] = [];
  banners: Banner[] = [];
  currentBannerIndex: number = 0;
  cartItemCount: number = 0;
  private bannerInterval: any;
  private cartSubscription!: Subscription;

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private bannerService: BannerService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.productService.getproducts().subscribe(data => {
      this.productos = data;
    });
    this.bannerService.getBanners().subscribe(data => {
      this.banners = data;
      if (this.banners.length > 0) {
        this.startBannerCarousel();
      }
    });
    this.cartSubscription = this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  ngOnDestroy(): void {
    this.stopBannerCarousel();
    this.cartSubscription.unsubscribe();
  }

  addToCart(product: products): void {
    this.cartService.addToCart(product);
    this.snackbarService.show('Producto agregado al carrito');
  }

  private startBannerCarousel(): void {
    this.bannerInterval = setInterval(() => {
      this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
    }, 5000); // Change banner every 5 seconds
  }

  private stopBannerCarousel(): void {
    if (this.bannerInterval) {
      clearInterval(this.bannerInterval);
    }
  }
}
