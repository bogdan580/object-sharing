import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ObjectSharingTestModule } from '../../../test.module';
import { AdvertismentComponent } from 'app/entities/advertisment/advertisment.component';
import { AdvertismentService } from 'app/entities/advertisment/advertisment.service';
import { Advertisment } from 'app/shared/model/advertisment.model';

describe('Component Tests', () => {
  describe('Advertisment Management Component', () => {
    let comp: AdvertismentComponent;
    let fixture: ComponentFixture<AdvertismentComponent>;
    let service: AdvertismentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ObjectSharingTestModule],
        declarations: [AdvertismentComponent],
        providers: []
      })
        .overrideTemplate(AdvertismentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdvertismentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdvertismentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Advertisment(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.advertisments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
