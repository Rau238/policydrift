import { Routes } from '@angular/router';
import { CurrencySwitcherComponent } from './currency-switcher/currency-switcher.component';
import { CrudUsingSignalComponent } from './crud-signal/crud-using-signal/crud-using-signal.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/crud-signal',
    pathMatch: 'full',
  },
  {
    path: 'coin-switcher',
    component: CurrencySwitcherComponent,
  },
  {
    path: 'crud-signal',
    component: CrudUsingSignalComponent,
  },
];
