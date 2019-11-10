import { Component, OnInit } from '@angular/core';
import { IArticle } from 'app/shared/model/article.model';
import { ArticlesFilter, IArticlesFilter } from 'app/shared/model/osh/articles.model';
import { scheduleIterable } from 'rxjs/internal/scheduled/scheduleIterable';

@Component({
  selector: 'jhi-articles',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  searchedArticles: IArticle[];
  showedDetail = true;
  showedFilter = true;
  filter: IArticlesFilter;
  constructor() {
    // debug
    this.filter = new ArticlesFilter();
    this.searchedArticles = [
      {id: 1, name: 'Article 1'},
      {id: 2, name: 'Article 2'},
      {id: 3, name: 'Article 3'},
      {id: 4, name: 'Article 4'},
      {id: 5, name: 'Article 5'},
      {id: 6, name: 'Article 6'},
    ];
  }

  ngOnInit() {}

  trackId(index: number, item: IArticle) {
    return item.id;
  }

  getFullViewSettings(block: string) {
    if (!this.showedDetail) {
      this.showedFilter = false;
      switch (block) {
        case 'right-sidebar':
          return 'flex';
        case 'search-list':
          return '1';
        case 'search-map':
          return '0.5';
      }
    }
  }

}
