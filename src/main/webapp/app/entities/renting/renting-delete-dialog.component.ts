import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRenting } from 'app/shared/model/renting.model';
import { RentingService } from './renting.service';

@Component({
  selector: 'jhi-renting-delete-dialog',
  templateUrl: './renting-delete-dialog.component.html'
})
export class RentingDeleteDialogComponent {
  renting: IRenting;

  constructor(protected rentingService: RentingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rentingService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'rentingListModification',
        content: 'Deleted an renting'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-renting-delete-popup',
  template: ''
})
export class RentingDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ renting }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RentingDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.renting = renting;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/renting', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/renting', { outlets: { popup: null } }]);
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
