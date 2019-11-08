import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Renting } from 'app/shared/model/renting.model';
import { RentingService } from './renting.service';
import { RentingComponent } from './renting.component';
import { RentingDetailComponent } from './renting-detail.component';
import { RentingUpdateComponent } from './renting-update.component';
import { RentingDeletePopupComponent } from './renting-delete-dialog.component';
import { IRenting } from 'app/shared/model/renting.model';

@Injectable({ providedIn: 'root' })
export class RentingResolve implements Resolve<IRenting> {
  constructor(private service: RentingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRenting> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Renting>) => response.ok),
        map((renting: HttpResponse<Renting>) => renting.body)
      );
    }
    return of(new Renting());
  }
}

export const rentingRoute: Routes = [
  {
    path: '',
    component: RentingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'objectSharingApp.renting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RentingDetailComponent,
    resolve: {
      renting: RentingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'objectSharingApp.renting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RentingUpdateComponent,
    resolve: {
      renting: RentingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'objectSharingApp.renting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RentingUpdateComponent,
    resolve: {
      renting: RentingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'objectSharingApp.renting.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rentingPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RentingDeletePopupComponent,
    resolve: {
      renting: RentingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'objectSharingApp.renting.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
