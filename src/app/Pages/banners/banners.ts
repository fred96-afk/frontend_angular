import { Component, OnInit } from '@angular/core';
import { Banner } from '../../Model/banner';
import { BannerService } from '../../Service/banner.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banners',
  imports: [CommonModule, RouterLink],
  templateUrl: './banners.html',
  styleUrls: ['./banners.css'],
})
export class BannersComponent implements OnInit {
  banners: Banner[] = [];

  constructor(private bannerService: BannerService) {}

  ngOnInit(): void {
    this.bannerService.getBanners().subscribe(data => {
      this.banners = data;
    });
  }
}
