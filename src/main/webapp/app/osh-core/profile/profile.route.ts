import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ProfileComponent } from 'app/osh-core/profile/containers/profile.component';

export const profileRoute: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService]
  }
];
