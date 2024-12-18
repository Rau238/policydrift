import { Injectable, signal } from '@angular/core';

interface Currency {
  code: string;
  symbol: string;
}
const DEFAULT_CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
];

@Injectable({
  providedIn: 'root',
})
export class CoinSwitcherService {
  readonly currencies = signal<Currency[]>(DEFAULT_CURRENCIES);
  readonly currentCurrency = signal<Currency>(DEFAULT_CURRENCIES[0]);

  setCurrency(currencyCode: Currency['code']) {
    const newCurrency = this.currencies().find(
      (currency) => currency.code === currencyCode
    );
    if (newCurrency) this.currentCurrency.set(newCurrency);
  }
}
