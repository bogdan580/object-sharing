import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IAdvertisment } from 'app/shared/model/advertisment.model';
import { AccountService } from 'app/core/auth/account.service';
import { AdvertismentService } from './advertisment.service';

@Component({
  selector: 'jhi-advertisment',
  templateUrl: './advertisment.component.html'
})
export class AdvertismentComponent implements OnInit, OnDestroy {
  advertisments: IAdvertisment[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected advertismentService: AdvertismentService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.advertismentService
      .query()
      .pipe(
        filter((res: HttpResponse<IAdvertisment[]>) => res.ok),
        map((res: HttpResponse<IAdvertisment[]>) => res.body)
      )
      .subscribe((res: IAdvertisment[]) => {
        this.advertisments = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAdvertisments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAdvertisment) {
    return item.id;
  }

  registerChangeInAdvertisments() {
    this.eventSubscriber = this.eventManager.subscribe('advertismentListModification', response => this.loadAll());
  }
}
