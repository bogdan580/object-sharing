import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdvertisment } from 'app/shared/model/advertisment.model';
import { AdvertismentService } from './advertisment.service';

@Component({
  selector: 'jhi-advertisment-delete-dialog',
  templateUrl: './advertisment-delete-dialog.component.html'
})
export class AdvertismentDeleteDialogComponent {
  advertisment: IAdvertisment;

  constructor(
    protected advertismentService: AdvertismentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.advertismentService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'advertismentListModification',
        content: 'Deleted an advertisment'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-advertisment-delete-popup',
  template: ''
})
export class AdvertismentDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ advertisment }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AdvertismentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.advertisment = advertisment;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/advertisment', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/advertisment', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
