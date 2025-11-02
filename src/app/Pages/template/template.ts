import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-template',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './template.html',
  styleUrl: './template.css',
})
export class Template {

}
