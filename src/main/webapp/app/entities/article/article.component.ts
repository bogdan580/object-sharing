import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IArticle } from 'app/shared/model/article.model';
import { AccountService } from 'app/core/auth/account.service';
import { ArticleService } from './article.service';

@Component({
  selector: 'jhi-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit, OnDestroy {
  articles: IArticle[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected articleService: ArticleService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.articleService
      .query()
      .pipe(
        filter((res: HttpResponse<IArticle[]>) => res.ok),
        map((res: HttpResponse<IArticle[]>) => res.body)
      )
      .subscribe((res: IArticle[]) => {
        this.articles = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInArticles();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IArticle) {
    return item.id;
  }

  registerChangeInArticles() {
    this.eventSubscriber = this.eventManager.subscribe('articleListModification', response => this.loadAll());
  }
}
