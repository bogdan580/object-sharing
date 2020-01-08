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
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

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
  aInRent: Renting[] = [];
  aReserved: Reservation[] = [];
  aActive: Article[] = [];
  aDisactive: Article[] = [];
  myReservations: Reservation[] = [];
  myRentings: Renting[] = [];

  categories: ICategory[];

  constructor(private fb: FormBuilder, private artService: ArticlesService, protected categoryService: CategoryService,
              protected jhiAlertService: JhiAlertService,  private confirmationService: ConfirmationService,
              private translateService: TranslateService) {
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
        this.aReserved.push(r);
      });
    });
    artService.getActiveRentsByArticleOwner().subscribe(rents => {
      console.log(rents.body);
      rents.body.forEach(r => {
        this.aInRent.push(r);
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
    let updateAct: Article = this.aActive.find(art => art.id === a.id);
    let updateDisAct = this.aDisactive.find(art => art.id === a.id);

    if (updateAct) {
      if (updateAct.status === a.status) {
        this.updateArtData(updateAct, a);
      } else {
        this.aActive = this.aActive.filter(art => art.id !== a.id);
        updateAct = null;
      }
    }
    if (updateDisAct) {
      if (updateDisAct.status === a.status) {
        this.updateArtData(updateDisAct, a);
      } else {
        this.aDisactive = this.aDisactive.filter(art => art.id !== a.id);
        updateDisAct = null;
      }
    }

    if (!updateAct && !updateDisAct) {
      switch (a.status) {
        case ObjectStatus.ACTIVE:
          this.aActive.push(a);
          break;
        case ObjectStatus.DISACTIVE:
          this.aDisactive.push(a);
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
    this.jhiAlertService.success('osh.alerts.articleAdded');
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
      console.log('changeArticleStatus res', res);
      this.updateArticleTable(res.body);
    });
    event.stopPropagation();
  }

  closeReservation(id: number, event: MouseEvent) {
    this.confirmationService.confirm({
      message: this.translateService.instant('osh.articles.reservations.delete'),
      header: this.translateService.instant('osh.articles.reservations.delete'),
      icon: 'pi pi-info-circle',
      accept: () => {
        this.artService.closeReservation(id).subscribe(res => {
          console.log('closeReservation res', res);
          this.jhiAlertService.success('osh.alerts.closeReservation');
          this.myReservations = this.myReservations.filter(art => art.id !== res.body.id);
        });
      }
    });

    event.stopPropagation();
  }

  makeRentFromReservation(reserv: Reservation, event: MouseEvent) {
    this.artService.makeRentFromReservation(reserv).subscribe(res => {
      if (res.ok) {
        console.log('makeRentFromReservation res', res);
        this.aReserved = this.aReserved.filter(r => r.id !== reserv.id);
        this.aInRent.push(res.body);
      } else {
        console.error(res.body);
      }

    });
    event.stopPropagation();
  }

   closeRent(id: number, event: MouseEvent) {
    this.confirmationService.confirm({
      message: this.translateService.instant('osh.articles.rent.close'),
      header: this.translateService.instant('osh.articles.rent.close'),
      icon: 'pi pi-info-circle',
      accept: () => {
        this.artService.closeRenting(id).subscribe(res => {
          console.log('closeRenting res', res);
          this.aInRent = this.aInRent.filter(r => r.id !== id);
          this.updateArticleTable(res.body.article);
        });
      }
    });

    event.stopPropagation();
  }
}
