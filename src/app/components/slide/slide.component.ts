import {Component, Input} from '@angular/core';
import {Slide} from "@interfaces/slide";
import {NgIf} from "@angular/common";
import {SlideService} from "@services/slide.service";

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.css'
})
export class SlideComponent {
  @Input() slide: Slide | undefined;

  keywordsToHighlight: string[] = [];

  constructor(private slideService: SlideService) {
    this.keywordsToHighlight = this.slideService.keywordsToHighlight;
  }

  highlightText(text: string): string {
    let result = text;
    this.keywordsToHighlight.forEach(word => {
      const regex = new RegExp(word, 'gi');
      result = result.replace(regex, `<span class="yellow-word">${word}</span>`);
    });
    return result;
  }
}
