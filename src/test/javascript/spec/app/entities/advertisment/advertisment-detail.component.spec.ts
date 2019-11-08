import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ObjectSharingTestModule } from '../../../test.module';
import { AdvertismentDetailComponent } from 'app/entities/advertisment/advertisment-detail.component';
import { Advertisment } from 'app/shared/model/advertisment.model';

describe('Component Tests', () => {
  describe('Advertisment Management Detail Component', () => {
    let comp: AdvertismentDetailComponent;
    let fixture: ComponentFixture<AdvertismentDetailComponent>;
    const route = ({ data: of({ advertisment: new Advertisment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ObjectSharingTestModule],
        declarations: [AdvertismentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AdvertismentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdvertismentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.advertisment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
