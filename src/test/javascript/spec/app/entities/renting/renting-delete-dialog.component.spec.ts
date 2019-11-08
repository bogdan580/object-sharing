import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ObjectSharingTestModule } from '../../../test.module';
import { RentingDeleteDialogComponent } from 'app/entities/renting/renting-delete-dialog.component';
import { RentingService } from 'app/entities/renting/renting.service';

describe('Component Tests', () => {
  describe('Renting Management Delete Component', () => {
    let comp: RentingDeleteDialogComponent;
    let fixture: ComponentFixture<RentingDeleteDialogComponent>;
    let service: RentingService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ObjectSharingTestModule],
        declarations: [RentingDeleteDialogComponent]
      })
        .overrideTemplate(RentingDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RentingDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RentingService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
