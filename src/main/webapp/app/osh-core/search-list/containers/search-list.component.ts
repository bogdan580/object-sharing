import { Component, OnInit } from '@angular/core';
import { IArticle } from 'app/shared/model/article.model';
import {
  ArticlesFilter,
  IArticlesFilter,
  IOshArticleDTO,
  IOshArticleInfoDTO
} from 'app/shared/model/osh/articles.model';
import { SearchListService } from 'app/osh-core/search-list/shared/services/search-list.service';
import { JhiAlertService } from 'ng-jhipster';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Point } from 'leaflet';

@Component({
  selector: 'jhi-articles',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  searchedArticles: IOshArticleDTO[];
  selectedArticle: IOshArticleDTO;
  selectedArticleInfo: IOshArticleInfoDTO;
  filter: IArticlesFilter;
  events: any[];
  selectedDays: any;
  categories: ICategory[];
  points: Point[];
  startPoint: Point;
  stopPoint: Point;
  zoom = 13;

  constructor(protected searchListService: SearchListService,
              private alertService: JhiAlertService,
              protected categoryService: CategoryService) {
    this.selectedDays = null;
    // debug
    this.filter = new ArticlesFilter();
    this.selectedArticle = null;
    this.points = [];
    this.startPoint = null;
    this.stopPoint = null;
  }

  ngOnInit() {
    this.refresh(); // for debug
    this.categoryService
      .query()
      .pipe(
        filter((res: HttpResponse<ICategory[]>) => res.ok),
        map((res: HttpResponse<ICategory[]>) => res.body)
      )
      .subscribe((res: ICategory[]) => {
        this.categories = res;
      });
  }

  trackId(index: number, item: IArticle) {
    return item.id;
  }

  search() {
    // console.log(this.filter);
    this.filter.items = +this.filter.items;
    this.searchListService.searchArticles(this.filter).subscribe(r => {
      // console.log(r.body);
      this.searchedArticles = r.body;
      this.points = [];
      r.body.forEach(a => {
        this.points.push(new Point(a.lat, a.lon));
      });
    });
  }

  selectArticle(article: IOshArticleDTO) {
    this.selectedArticle = article;
    this.stopPoint = new Point(article.lat, article.lon);
    this.searchListService.getArticleInfo(article.id).subscribe(r => {
      console.log('articleInfo', r.body);
      this.selectedArticleInfo = r.body;
      this.events = [];
      this.selectedArticleInfo.rentings.forEach(rents => {
        this.events.push({
            'title': 'Renting',
            'start': formatDate(rents.startTime, 'yyyy-MM-dd', 'PL'),
            'end': formatDate(rents.endTime, 'yyyy-MM-dd', 'PL'),
            'rendering': 'background'
          }
        );
      });

      this.selectedArticleInfo.reservations.forEach(resrv => {
        this.events.push({
          'title': 'Reservation',
          'start': formatDate(resrv.startTime, 'yyyy-MM-dd', 'PL'),
          'end': formatDate(resrv.endTime, 'yyyy-MM-dd', 'PL')
        });
      });
    });
  }

  onReserve(event: any) {
    console.log('reserve', event);
    this.selectedDays = event;
  }

  addReserve() {
    if (this.isPastDate()) {
      this.alertService.warning('Start date cannot be from the past');
    } else if (this.isDateReserved()) {
      this.alertService.warning('This article is reserved in selected period');
    } else {
      this.events = [...this.events, this.selectedDays];
      this.selectedDays = null;
      this.alertService.success('Article was reserved');
    }
  }

  isPastDate() {
    const date = new Date();
    // console.log(formatDate(date, 'yyyy-MM-dd', 'PL'));
    // console.log(date.getTime());
    // console.log(this.selectedDays.start);
    // console.log(Date.parse(this.selectedDays.start).valueOf());
    return date.getTime() > Date.parse(this.selectedDays.start).valueOf();
  }

  isDateReserved() {
    let reserved = false;
    this.events.forEach(e => {
      const start = Date.parse(e.start);
      const end = Date.parse(e.end);
      const checkStart = Date.parse(this.selectedDays.start);
      const checkEnd = Date.parse(this.selectedDays.end);
      // console.log('------------------');
      // console.log('event: ' + e.start + ' ' + e.end);
      // console.log('selectedDays: ' + this.selectedDays.start + ' ' + this.selectedDays.end);
      if (e.end) {
        // console.log('isn\'t single day event');
        /* console.log('between: ', checkStart <= start && end <= checkEnd);
         console.log('inside: ', start <= checkStart && checkEnd <= end);
         console.log('cross start: ', checkStart <= start && start < checkEnd && checkEnd <= end);
         console.log('cross end: ', start <=  checkStart && checkStart < end && end <= checkEnd);*/
        if ((checkStart <= start && end <= checkEnd) ||
          (start <= checkStart && checkEnd <= end) ||
          (checkStart <= start && start < checkEnd && checkEnd <= end) ||
          (start <= checkStart && checkStart < end && end <= checkEnd)) {
          reserved = true;
          return;
        }
      } else {
        // console.log('is single day event');
        // console.log('between:', checkStart <= start && start < checkEnd);
        if (checkStart <= start && start < checkEnd) {
          reserved = true;
          return;
        }
      }
      // console.log('------------------');
    });
    return reserved;
  }

  refresh() { // for debug
    this.searchedArticles = [
      { id: 1, name: 'Article 1' },
      { id: 2, name: 'Article 2' },
      { id: 3, name: 'Article 3' },
      { id: 4, name: 'Article 4' },
      { id: 5, name: 'Article 5' },
      { id: 6, name: 'Article 6' },
      { id: 7, name: 'Article 1' },
      { id: 8, name: 'Article 2' },
      { id: 9, name: 'Article 3' },
      { id: 10, name: 'Article 4' },
      { id: 11, name: 'Article 5' },
      { id: 12, name: 'Article 6' }
    ];
    this.events = [
      {
        'title': 'All Day Event',
        'start': '2020-01-01',
        'rendering': 'background'
      },
      {
        'title': 'Long Event',
        'start': '2020-01-07',
        'end': '2020-01-10'
      },
      {
        'title': 'Repeating Event',
        'start': '2020-01-09T16:00:00'
      },
      {
        'title': 'Repeating Event',
        'start': '2020-01-16T16:00:00'
      },
      {
        'title': 'Conference',
        'start': '2020-01-11',
        'end': '2020-01-13'
      }
    ];
  }

  closeArticleInfo() {
    this.selectedArticle = null;
    this.stopPoint = null;
  }
}

