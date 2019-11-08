import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'advertisment',
        loadChildren: () => import('./advertisment/advertisment.module').then(m => m.ObjectSharingAdvertismentModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.ObjectSharingLocationModule)
      },
      {
        path: 'user-info',
        loadChildren: () => import('./user-info/user-info.module').then(m => m.ObjectSharingUserInfoModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.ObjectSharingCategoryModule)
      },
      {
        path: 'article',
        loadChildren: () => import('./article/article.module').then(m => m.ObjectSharingArticleModule)
      },
      {
        path: 'renting',
        loadChildren: () => import('./renting/renting.module').then(m => m.ObjectSharingRentingModule)
      },
      {
        path: 'reservation',
        loadChildren: () => import('./reservation/reservation.module').then(m => m.ObjectSharingReservationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ObjectSharingEntityModule {}
