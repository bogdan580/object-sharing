import { Component, OnInit } from '@angular/core';
import { Currency } from 'app/shared/model/enumerations/currency.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ArticlesService } from 'app/osh-core/articles/shared/services/article.service';
import { Article, IArticle } from 'app/shared/model/article.model';
import { ObjectStatus } from 'app/shared/model/enumerations/object-status.model';
import { Reservation } from 'app/shared/model/reservation.model';
import { Renting } from 'app/shared/model/renting.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RentPeriod } from 'app/shared/model/enumerations/rent-period.model';
import { filter, map } from 'rxjs/operators';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  isSaving: boolean;
  currency = Currency;
  rentPeriod = RentPeriod;
  articleForm = this.fb.group({
    id: [],
    name: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    desc: [],
    mainImage: [undefined, [Validators.required]],
    price: [undefined, [Validators.required]],
    rentPeriod: [undefined, [Validators.required]],
    currency: [undefined, [Validators.required]],
    category: [undefined, [Validators.required]],
    status: [],
    addTime: [],
    user: [],
    location: []
  });
  a_in_rent: Article[] = [];
  a_reserved: Reservation[] = [];
  a_active: Article[] = [];
  a_disactive: Article[] = [];
  myReservations: Reservation[] = [];
  myRentings: Renting[] = [];

  categories: ICategory[];

  constructor(private fb: FormBuilder, private artService: ArticlesService, protected categoryService: CategoryService,
              protected jhiAlertService: JhiAlertService) {
    this.isSaving = false;
    // My articles
    artService.myArticles().subscribe(artcls => {
      console.log(artcls.body);
      artcls.body.forEach(a => {
        this.updateArticleTable(a);
      });
    });
    artService.getActiveReservesByArticleOwner().subscribe(reservs => {
      console.log(reservs.body);
      reservs.body.forEach(r => {
        this.a_reserved.push(r);
      });
    });
    // My reserves and rents
    artService.getMyReservedArticles().subscribe(reservs => {
      this.myReservations = reservs.body;
    });
    artService.getMyRentedArticles().subscribe(rents => {
      this.myRentings = rents.body;
    });
  }

  updateArtData(a: IArticle, newA: IArticle) {
    a.name = newA.name;
    a.desc = newA.desc;
    a.status = newA.status;
    a.price = newA.price;
    a.mainImage = newA.mainImage;
    a.rentPeriod = newA.rentPeriod;
    a.currency = newA.currency;
    a.category = newA.category;
  }

  updateArticleTable(a: IArticle) {
    let updateAct: Article = this.a_active.find(art => art.id === a.id);
    let updateDisAct = this.a_disactive.find(art => art.id === a.id);
    let updateInRent = this.a_in_rent.find(art => art.id === a.id);

    if (updateAct) {
      if (updateAct.status === a.status) {
        this.updateArtData(updateAct, a);
      } else {
        this.a_active = this.a_active.filter(art => art.id !== a.id);
        updateAct = null;
      }
    }
    if (updateDisAct) {
      if (updateDisAct.status === a.status) {
        this.updateArtData(updateDisAct, a);
      } else {
        this.a_disactive = this.a_disactive.filter(art => art.id !== a.id);
        updateDisAct = null;
      }
    }
    if (updateInRent) {
      if (updateInRent.status === a.status) {
        this.updateArtData(updateInRent, a);
      } else {
        this.a_in_rent = this.a_in_rent.filter(art => art.id !== a.id);
        updateInRent = null;
      }
    }

    if (!updateAct && !updateDisAct && !updateInRent) {
      switch (a.status) {
        case ObjectStatus.ACTIVE:
          this.a_active.push(a);
          break;
        case ObjectStatus.DISACTIVE:
          this.a_disactive.push(a);
          break;
        case ObjectStatus.INRENT:
          this.a_in_rent.push(a);
          break;
      }
      this.updateForm(null);
    }
  }

  updateForm(article: IArticle) {
    if (!article) {
      article = new Article();
    }
    console.log('article', article);
    this.articleForm.patchValue({
      id: article.id,
      name: article.name,
      desc: article.desc,
      status: article.status,
      addTime: article.addTime,
      price: article.price,
      mainImage: article.mainImage,
      rentPeriod: article.rentPeriod,
      currency: article.currency,
      user: article.user,
      location: article.location,
      category: article.category
    });
  }


  ngOnInit() {
    this.categoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategory[]>) => response.body)
      )
      .subscribe((res: ICategory[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  saveArticle() {
    this.isSaving = true;
    const article = this.createFromForm();
    article.status = (article.status) ? article.status : ObjectStatus.ACTIVE;
    console.log('article', article);
    this.subscribeToSaveResponse(this.artService.saveArticle(article));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticle>>) {
    result.subscribe(art => this.onSaveSuccess(art.body), () => this.onSaveError());
  }

  protected onSaveSuccess(article: IArticle) {
    this.isSaving = false;
    this.updateArticleTable(article);
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }

  private createFromForm(): IArticle {
    return {
      ...new Article(),
      id: this.articleForm.get(['id']).value,
      name: this.articleForm.get(['name']).value,
      desc: this.articleForm.get(['desc']).value,
      status: this.articleForm.get(['status']).value,
      addTime: this.articleForm.get(['addTime']).value,
      price: this.articleForm.get(['price']).value,
      mainImage: this.articleForm.get(['mainImage']).value,
      rentPeriod: this.articleForm.get(['rentPeriod']).value,
      currency: this.articleForm.get(['currency']).value,
      user: this.articleForm.get(['user']).value,
      location: this.articleForm.get(['location']).value,
      category: this.articleForm.get(['category']).value
    };
  }

  changeStatus(id: number, status: string, event: MouseEvent) {
    this.artService.changeArticleStatus(id, status).subscribe(res => {
      console.log('res', res);
      this.updateArticleTable(res.body);
    });
    event.stopPropagation();
  }
}
