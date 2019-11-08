import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IRenting } from 'app/shared/model/renting.model';
import { AccountService } from 'app/core/auth/account.service';
import { RentingService } from './renting.service';

@Component({
  selector: 'jhi-renting',
  templateUrl: './renting.component.html'
})
export class RentingComponent implements OnInit, OnDestroy {
  rentings: IRenting[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected rentingService: RentingService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.rentingService
      .query()
      .pipe(
        filter((res: HttpResponse<IRenting[]>) => res.ok),
        map((res: HttpResponse<IRenting[]>) => res.body)
      )
      .subscribe((res: IRenting[]) => {
        this.rentings = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRentings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRenting) {
    return item.id;
  }

  registerChangeInRentings() {
    this.eventSubscriber = this.eventManager.subscribe('rentingListModification', response => this.loadAll());
  }
}
