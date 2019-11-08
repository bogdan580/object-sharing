import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ArticlesComponent } from 'app/osh-core/articles/containers/articles.component';

export const articlesRoute: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    data: {
      authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService]
  }
];
