import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

const routes: Routes = [
  {
    path: 'articles',
    loadChildren: () => import('./articles/articles.module').then(a => a.ArticlesModule),
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'osh.articles.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(p => p.ProfileModule),
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'osh.profile.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'search-list',
    loadChildren: () => import('./search-list/search-list.module').then(s => s.SearchListModule),
    data: {
      authorities: [],
      pageTitle: 'osh.searchList.title'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  providers: []
})
export class OshRoutingModule {
}
