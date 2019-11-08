import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAdvertisment, Advertisment } from 'app/shared/model/advertisment.model';
import { AdvertismentService } from './advertisment.service';

@Component({
  selector: 'jhi-advertisment-update',
  templateUrl: './advertisment-update.component.html'
})
export class AdvertismentUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    imageUrl: [null, [Validators.required]],
    desc: [],
    status: [null, [Validators.required]]
  });

  constructor(protected advertismentService: AdvertismentService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ advertisment }) => {
      this.updateForm(advertisment);
    });
  }

  updateForm(advertisment: IAdvertisment) {
    this.editForm.patchValue({
      id: advertisment.id,
      title: advertisment.title,
      imageUrl: advertisment.imageUrl,
      desc: advertisment.desc,
      status: advertisment.status
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const advertisment = this.createFromForm();
    if (advertisment.id !== undefined) {
      this.subscribeToSaveResponse(this.advertismentService.update(advertisment));
    } else {
      this.subscribeToSaveResponse(this.advertismentService.create(advertisment));
    }
  }

  private createFromForm(): IAdvertisment {
    return {
      ...new Advertisment(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      imageUrl: this.editForm.get(['imageUrl']).value,
      desc: this.editForm.get(['desc']).value,
      status: this.editForm.get(['status']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdvertisment>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
