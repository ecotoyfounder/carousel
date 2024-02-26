import { animate, style, transition, trigger } from '@angular/animations';

export const carouselAnimations = trigger('carouselAnimations', [
  transition(':increment', [
    style({ transform: 'translateX(-100%)' }),
    animate('500ms ease-out', style({ transform: 'translateX(0%)' })),
  ]),
  transition(':decrement', [
    style({ transform: 'translateX(100%)' }),
    animate('500ms ease-out', style({ transform: 'translateX(0%)' })),
  ]),
]);
