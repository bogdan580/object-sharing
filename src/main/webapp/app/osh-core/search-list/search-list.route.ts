import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SearchListComponent } from 'app/osh-core/search-list/containers/search-list.component';

export const searchListRoute: Routes = [
  {
    path: '',
    component: SearchListComponent,
    data: {
      authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService]
  }
];
