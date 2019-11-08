import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Advertisment } from 'app/shared/model/advertisment.model';
import { AdvertismentService } from './advertisment.service';
import { AdvertismentComponent } from './advertisment.component';
import { AdvertismentDetailComponent } from './advertisment-detail.component';
import { AdvertismentUpdateComponent } from './advertisment-update.component';
import { AdvertismentDeletePopupComponent } from './advertisment-delete-dialog.component';
import { IAdvertisment } from 'app/shared/model/advertisment.model';

@Injectable({ providedIn: 'root' })
export class AdvertismentResolve implements Resolve<IAdvertisment> {
  constructor(private service: AdvertismentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAdvertisment> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Advertisment>) => response.ok),
        map((advertisment: HttpResponse<Advertisment>) => advertisment.body)
      );
    }
    return of(new Advertisment());
  }
}

export const advertismentRoute: Routes = [
  {
    path: '',
    component: AdvertismentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'objectSharingApp.advertisment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdvertismentDetailComponent,
    resolve: {
      advertisment: AdvertismentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'objectSharingApp.advertisment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdvertismentUpdateComponent,
    resolve: {
      advertisment: AdvertismentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'objectSharingApp.advertisment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdvertismentUpdateComponent,
    resolve: {
      advertisment: AdvertismentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'objectSharingApp.advertisment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const advertismentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AdvertismentDeletePopupComponent,
    resolve: {
      advertisment: AdvertismentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'objectSharingApp.advertisment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
