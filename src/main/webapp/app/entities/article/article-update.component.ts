import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IArticle, Article } from 'app/shared/model/article.model';
import { ArticleService } from './article.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';

@Component({
  selector: 'jhi-article-update',
  templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  locations: ILocation[];

  categories: ICategory[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    desc: [],
    status: [null, [Validators.required]],
    addTime: [],
    price: [],
    mainImage: [],
    rentPeriod: [],
    currency: [],
    user: [],
    location: [],
    category: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected articleService: ArticleService,
    protected userService: UserService,
    protected locationService: LocationService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ article }) => {
      this.updateForm(article);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.locationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILocation[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILocation[]>) => response.body)
      )
      .subscribe((res: ILocation[]) => (this.locations = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.categoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategory[]>) => response.body)
      )
      .subscribe((res: ICategory[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(article: IArticle) {
    this.editForm.patchValue({
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

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const article = this.createFromForm();
    if (article.id !== undefined) {
      this.subscribeToSaveResponse(this.articleService.update(article));
    } else {
      this.subscribeToSaveResponse(this.articleService.create(article));
    }
  }

  private createFromForm(): IArticle {
    return {
      ...new Article(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      desc: this.editForm.get(['desc']).value,
      status: this.editForm.get(['status']).value,
      addTime: this.editForm.get(['addTime']).value,
      price: this.editForm.get(['price']).value,
      mainImage: this.editForm.get(['mainImage']).value,
      rentPeriod: this.editForm.get(['rentPeriod']).value,
      currency: this.editForm.get(['currency']).value,
      user: this.editForm.get(['user']).value,
      location: this.editForm.get(['location']).value,
      category: this.editForm.get(['category']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticle>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }
}
