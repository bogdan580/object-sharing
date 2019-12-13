import { Component, OnInit } from '@angular/core';
import { Currency } from 'app/shared/model/enumerations/currency.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ArticlesService } from 'app/osh-core/articles/shared/services/article.service';
import { Article } from 'app/shared/model/article.model';
import { ObjectStatus } from 'app/shared/model/enumerations/object-status.model';
import { Reservation } from 'app/shared/model/reservation.model';
import { Renting } from 'app/shared/model/renting.model';

@Component({
  selector: 'jhi-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  currency = Currency;
  articleForm = this.fb.group({
    name: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    desc: [],
    mainImage: [undefined, [Validators.required]],
    price: [undefined, [Validators.required]],
    currency: [undefined, [Validators.required]],
    categoryName: [undefined, [Validators.required]]
  });
  a_in_rent: Article[] = [];
  a_reserved: Article[] = [];
  a_active: Article[] = [];
  a_disabled: Article[] = [];
  myReservations: Reservation[] = [];
  myRentings: Renting[] = [];
  constructor(private fb: FormBuilder, private artService: ArticlesService) {
    artService.myArticles().subscribe(artcls => {
      console.log(artcls.body);
      artcls.body.forEach(a => {
        switch (a.status) {
          case ObjectStatus.INRENT:
            this.a_in_rent.push(a);
            break;
          case ObjectStatus.RESERVED:
            this.a_reserved.push(a);
            break;
          case ObjectStatus.ACTIVE:
            this.a_active.push(a);
            break;
          case ObjectStatus.DISACTIVE:
            this.a_disabled.push(a);
            break;
        }
      });
    });
    artService.getMyReservedArticles().subscribe( reservs => {
      this.myReservations = reservs.body;
    });
    artService.getMyRentedArticles().subscribe( rents => {
      this.myRentings = rents.body;
    });
  }

  ngOnInit() {}

  saveArticle() {
  }
}
