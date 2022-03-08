import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { Product } from "../../models/product";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-product.component.scss']
})
export class FeaturedProductComponent implements OnInit, OnDestroy {



  public products: any[] = [];
  endSubs$ : Subject<any> = new Subject();
  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {

 this._listProduct();
  }

  ngOnDestroy(): void {
      this.endSubs$.next;
      this.endSubs$.complete();
  }





  _listProduct(): void {
    this.prodService.getAllProducts()
    .then((res: any) => {
      if (res && !res.status) {
        if (res.response && res.response.length) {
          this.products = res.response

        } else {
         console.log('error')
        }
      }
    }).catch((err: HttpErrorResponse) => (console.log))
  }



}



