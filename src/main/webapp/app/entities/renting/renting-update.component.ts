import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRenting, Renting } from 'app/shared/model/renting.model';
import { RentingService } from './renting.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article/article.service';

@Component({
  selector: 'jhi-renting-update',
  templateUrl: './renting-update.component.html'
})
export class RentingUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  articles: IArticle[];

  editForm = this.fb.group({
    id: [],
    startTime: [],
    endTime: [],
    price: [],
    rentPeriod: [],
    currency: [],
    user: [],
    article: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rentingService: RentingService,
    protected userService: UserService,
    protected articleService: ArticleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ renting }) => {
      this.updateForm(renting);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.articleService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArticle[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArticle[]>) => response.body)
      )
      .subscribe((res: IArticle[]) => (this.articles = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(renting: IRenting) {
    this.editForm.patchValue({
      id: renting.id,
      startTime: renting.startTime,
      endTime: renting.endTime,
      price: renting.price,
      rentPeriod: renting.rentPeriod,
      currency: renting.currency,
      user: renting.user,
      article: renting.article
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const renting = this.createFromForm();
    if (renting.id !== undefined) {
      this.subscribeToSaveResponse(this.rentingService.update(renting));
    } else {
      this.subscribeToSaveResponse(this.rentingService.create(renting));
    }
  }

  private createFromForm(): IRenting {
    return {
      ...new Renting(),
      id: this.editForm.get(['id']).value,
      startTime: this.editForm.get(['startTime']).value,
      endTime: this.editForm.get(['endTime']).value,
      price: this.editForm.get(['price']).value,
      rentPeriod: this.editForm.get(['rentPeriod']).value,
      currency: this.editForm.get(['currency']).value,
      user: this.editForm.get(['user']).value,
      article: this.editForm.get(['article']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRenting>>) {
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

  trackArticleById(index: number, item: IArticle) {
    return item.id;
  }
}
