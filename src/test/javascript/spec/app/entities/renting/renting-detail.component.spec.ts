import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ObjectSharingTestModule } from '../../../test.module';
import { RentingDetailComponent } from 'app/entities/renting/renting-detail.component';
import { Renting } from 'app/shared/model/renting.model';

describe('Component Tests', () => {
  describe('Renting Management Detail Component', () => {
    let comp: RentingDetailComponent;
    let fixture: ComponentFixture<RentingDetailComponent>;
    const route = ({ data: of({ renting: new Renting(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ObjectSharingTestModule],
        declarations: [RentingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RentingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RentingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.renting).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
