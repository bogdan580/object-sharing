import { Component, OnInit } from '@angular/core';
import { IArticle } from 'app/shared/model/article.model';
import { ArticlesFilter, IArticlesFilter } from 'app/shared/model/osh/articles.model';

@Component({
  selector: 'jhi-articles',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  searchedArticles: IArticle[];
  showedDetail = true;
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

}
