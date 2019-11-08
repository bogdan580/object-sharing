import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IReservation } from 'app/shared/model/reservation.model';
import { AccountService } from 'app/core/auth/account.service';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'jhi-reservation',
  templateUrl: './reservation.component.html'
})
export class ReservationComponent implements OnInit, OnDestroy {
  reservations: IReservation[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected reservationService: ReservationService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.reservationService
      .query()
      .pipe(
        filter((res: HttpResponse<IReservation[]>) => res.ok),
        map((res: HttpResponse<IReservation[]>) => res.body)
      )
      .subscribe((res: IReservation[]) => {
        this.reservations = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInReservations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IReservation) {
    return item.id;
  }

  registerChangeInReservations() {
    this.eventSubscriber = this.eventManager.subscribe('reservationListModification', response => this.loadAll());
  }
}
