import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CarouselComponentComponent} from "./components/carousel-component/carousel-component.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarouselComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
