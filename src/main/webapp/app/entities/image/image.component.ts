import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IImage } from 'app/shared/model/image.model';
import { AccountService } from 'app/core/auth/account.service';
import { ImageService } from './image.service';

@Component({
  selector: 'jhi-image',
  templateUrl: './image.component.html'
})
export class ImageComponent implements OnInit, OnDestroy {
  images: IImage[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected imageService: ImageService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.imageService
      .query()
      .pipe(
        filter((res: HttpResponse<IImage[]>) => res.ok),
        map((res: HttpResponse<IImage[]>) => res.body)
      )
      .subscribe((res: IImage[]) => {
        this.images = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInImages();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IImage) {
    return item.id;
  }

  registerChangeInImages() {
    this.eventSubscriber = this.eventManager.subscribe('imageListModification', response => this.loadAll());
  }
}
