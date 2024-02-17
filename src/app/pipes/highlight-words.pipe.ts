import { Pipe, PipeTransform } from '@angular/core';
import {SlideService} from "../services/slide.service";

@Pipe({
  name: 'highlightWords',
  standalone: true
})
export class HighlightWordsPipe implements PipeTransform {

  constructor(private slideService: SlideService) {}

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

  transform(value: string): string {
    if (!value || !this.slideService.keywordsToHighlight || this.slideService.keywordsToHighlight.length === 0) {
      return value;
    }

    return this.highlightText(value, this.slideService.keywordsToHighlight);
  }

}
