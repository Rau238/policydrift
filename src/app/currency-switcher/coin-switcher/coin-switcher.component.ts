import { Component, inject, OnInit } from '@angular/core';
import { CoinSwitcherService } from './coin-switcher.service';

@Component({
  selector: 'app-coin-switcher',
  templateUrl: './coin-switcher.component.html',
  styleUrls: ['./coin-switcher.component.css'],
})
export class CoinSwitcherComponent implements OnInit {
  coinSwitcherService = inject(CoinSwitcherService);

  ngOnInit() {}
}
