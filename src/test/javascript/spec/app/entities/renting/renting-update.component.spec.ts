import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ObjectSharingTestModule } from '../../../test.module';
import { RentingUpdateComponent } from 'app/entities/renting/renting-update.component';
import { RentingService } from 'app/entities/renting/renting.service';
import { Renting } from 'app/shared/model/renting.model';

describe('Component Tests', () => {
  describe('Renting Management Update Component', () => {
    let comp: RentingUpdateComponent;
    let fixture: ComponentFixture<RentingUpdateComponent>;
    let service: RentingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ObjectSharingTestModule],
        declarations: [RentingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RentingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RentingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RentingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Renting(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Renting();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
