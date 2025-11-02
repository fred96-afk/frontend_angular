import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../../Service/snackbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snackbar',
  imports: [CommonModule],
  templateUrl: './snackbar.html',
  styleUrls: ['./snackbar.css'],
})
export class SnackbarComponent implements OnInit {
  message: string = '';
  visible: boolean = false;

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.snackbarService.snackbar$.subscribe(snackbar => {
      this.message = snackbar.message;
      this.visible = snackbar.visible;
    });
  }
}
