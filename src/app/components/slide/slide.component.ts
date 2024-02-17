import {Component, Input} from '@angular/core';
import {Slide} from "../../interfaces/slide";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {HighlightWordsPipe} from "../../pipes/highlight-words.pipe";

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgForOf,
    HighlightWordsPipe
  ],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.css'
})
export class SlideComponent {
  @Input() slide: Slide | undefined;
}
