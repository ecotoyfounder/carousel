import { animate, style, transition, trigger } from '@angular/animations';

export const carouselAnimations = trigger('carouselAnimations', [
  transition('prev <=> next', [
    style({ transform: '{{fromTransform}}' }),
    animate('500ms ease', style({ transform: '{{toTransform}}' })),
  ]),
]);
