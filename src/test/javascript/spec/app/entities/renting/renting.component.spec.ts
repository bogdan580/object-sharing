import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ObjectSharingTestModule } from '../../../test.module';
import { RentingComponent } from 'app/entities/renting/renting.component';
import { RentingService } from 'app/entities/renting/renting.service';
import { Renting } from 'app/shared/model/renting.model';

describe('Component Tests', () => {
  describe('Renting Management Component', () => {
    let comp: RentingComponent;
    let fixture: ComponentFixture<RentingComponent>;
    let service: RentingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ObjectSharingTestModule],
        declarations: [RentingComponent],
        providers: []
      })
        .overrideTemplate(RentingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RentingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RentingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Renting(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rentings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
