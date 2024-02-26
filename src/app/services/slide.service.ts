import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Slide } from '@interfaces/slide';

@Injectable({
  providedIn: 'root',
})
export class SlideService {
  getSlides(): Observable<Slide[]> {
    const slides: Slide[] = [
      {
        title: 'WinzUp Loyalty Program',
        text: 'Get up to 35% in rewards: daily rakeback, weekly cashback and level-up bonuses',
        imageUrl: 'assets/winzup_mob.png',
        bgImageUrl: 'assets/winzup-bg-mob.webp',
        buttonContent: 'Join now',
      },
      {
        title: "Valentine's Fortune Drops",
        text: 'Trigger random prizes and win a share of €30,000!',
        imageUrl: 'assets/ValentinesFortuneDrops_mob-pic.png',
        bgImageUrl: 'assets/ValentinesFortuneDrops_mob-bg.png',
        buttonContent: 'Learn more',
      },
      {
        title: 'Wheel of Winz',
        text: 'Spin the wheel to win up to €15,000 weekly',
        imageUrl: 'assets/wheel-mob.png',
        bgImageUrl: 'assets/wheel-mob-bg.webp',
        buttonContent: 'Spin now',
      },
    ];

    return of(slides);
  }
}
