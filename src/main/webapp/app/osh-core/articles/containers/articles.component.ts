import { Component, OnInit } from '@angular/core';
import { Currency } from 'app/shared/model/enumerations/currency.model';
import { FormBuilder, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  saveArticle() {

  }
}
