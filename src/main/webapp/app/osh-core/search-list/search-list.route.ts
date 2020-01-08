import { Routes } from '@angular/router';
import { SearchListComponent } from 'app/osh-core/search-list/containers/search-list.component';

export const searchListRoute: Routes = [
  {
    path: '',
    component: SearchListComponent,
    data: {
      authorities: []
    }
  }
];
