import {Component, Input} from '@angular/core';
import {SlideService} from "@services/slide.service";

@Component({
  selector: 'app-height-lighter',
  standalone: true,
  imports: [],
  template: `<span [innerHTML]="getHighlightedText()"></span>`,
})
export class HeightLighterComponent {

  @Input() text: string = '';
  @Input() keywordsToHighlight: string[] = [];

  constructor(private slideService: SlideService) {
    this.keywordsToHighlight = this.slideService.keywordsToHighlight;
  }

  private highlightText(text: string, wordsToHighlight: string[]): string {
    let result = text;

    wordsToHighlight.forEach(word => {
      const startIndex = result.toLowerCase().indexOf(word.toLowerCase());
      if (startIndex !== -1) {
        const endIndex = startIndex + word.length;
        result = result.substring(0, startIndex) +
          `<span class="yellow-word">${result.substring(startIndex, endIndex)}</span>` +
          result.substring(endIndex);
      }
    });

    return result;
  }

  getHighlightedText(): string {
    if (!this.text || !this.keywordsToHighlight || this.keywordsToHighlight.length === 0) {
      return this.text;
    }

    return this.highlightText(this.text, this.keywordsToHighlight);
  }
}
