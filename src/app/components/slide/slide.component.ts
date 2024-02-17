import {Component, Input} from '@angular/core';
import {Slide} from "@interfaces/slide";
import {NgIf} from "@angular/common";
import {HeightLighterComponent} from "@components/height-lighter/height-lighter.component";

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [
    NgIf,
    HeightLighterComponent
  ],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.css'
})
export class SlideComponent {
  @Input() slide: Slide | undefined;
}
