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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  providers: []
})
export class OshRoutingModule {
}
