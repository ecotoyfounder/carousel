import { Component, Input, OnInit } from '@angular/core';
import { Slide } from '@interfaces/slide';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [NgIf],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.css',
})
export class SlideComponent implements OnInit {
  @Input() slide: Slide | undefined;
  selectedText = '';

  ngOnInit() {
    const savedSelectedTextWithTags = localStorage.getItem(
      'selectedTextWithTags',
    );
    if (savedSelectedTextWithTags && this.slide?.text) {
      this.selectedText = savedSelectedTextWithTags;
      this.highlightText(this.slide.text);
    }
  }

  highlightSelectedText() {
    const selection = window.getSelection();

    if (selection) {
      this.selectedText = selection.toString().trim();
      const words = this.selectedText.split(/\s+/);
      words.forEach((word) => {
        if (word.length > 0 && this.selectedText.includes(word)) {
          const yellowHighlightedText = `<span class="yellow-word">${word}</span>`;
          const range = selection.getRangeAt(0);
          range.deleteContents();
          range.insertNode(
            document
              .createRange()
              .createContextualFragment(yellowHighlightedText),
          );
        }
      });
      this.updateLocalStorage();
    }
  }

  updateSlideText() {
    if (this.slide && this.slide.text) {
      this.slide.text = this.highlightText(this.slide.text);
    }
  }

  updateLocalStorage() {
    localStorage.setItem('selectedTextWithTags', this.selectedText);
    this.updateSlideText();
  }

  highlightText(text: string): string {
    if (this.slide) {
      const textArr = this.slide.text.split(' ');
      const selectedWords = textArr.filter((w) =>
        w.includes(this.selectedText),
      );
      textArr.forEach((word, index) => {
        if (selectedWords.includes(word)) {
          textArr[index] = selectedWords[selectedWords.indexOf(word)];
        }
      });
      text = textArr.join(' ');
    }
    return text;
  }
}
