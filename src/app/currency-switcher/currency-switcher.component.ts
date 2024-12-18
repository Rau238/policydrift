import { Component, computed, effect, inject, signal } from '@angular/core';
import { CoinSwitcherComponent } from './coin-switcher/coin-switcher.component';
import { CoinSwitcherService } from './coin-switcher/coin-switcher.service';

@Component({
  selector: 'app-currency-switcher',
  templateUrl: './currency-switcher.component.html',
  styleUrls: ['./currency-switcher.component.css'],
  imports: [CoinSwitcherComponent],
})
export class CurrencySwitcherComponent {
  coinSwitcherService = inject(CoinSwitcherService);
  greeting = signal('Hello');
  name = signal('Angular');
  message = computed(() => `${this.greeting()} ${this.name()}!`);
  constructor() {
    effect(() => console.log('Message changed to ' + this.message()));
  }
}
