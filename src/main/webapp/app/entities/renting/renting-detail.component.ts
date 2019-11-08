import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRenting } from 'app/shared/model/renting.model';

@Component({
  selector: 'jhi-renting-detail',
  templateUrl: './renting-detail.component.html'
})
export class RentingDetailComponent implements OnInit {
  renting: IRenting;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ renting }) => {
      this.renting = renting;
    });
  }

  previousState() {
    window.history.back();
  }
}
