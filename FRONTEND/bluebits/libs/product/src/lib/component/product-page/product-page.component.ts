import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { Product } from "../../models/product";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
 // product: Product;
  endSubs$: Subject<any> = new Subject;
  quantity: number;
  products;
 public product: any[] = [];
  
  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      if(params.productid){
        this._getProduct(params.productid);
      }
    })
  
 
  }
  ngOnDestroy(): void {
    this.endSubs$.next;
    this.endSubs$.complete();

}
  




  private _getProduct(data){
     

// this line convert string to integer data
const numberValue = Number(data)

    const obj = {Id : numberValue }
    this.prodService.getProductById(obj)
            .then((res: any) => {
            
                if (res && !res.status && res.response.length) {
                   this.product = res.response;
                    
                }
            }).catch((err: HttpErrorResponse) => (console.log))





      // this.prodService.getProductById().then((res:any) =>{
      //   if(res && !res.status){
      //     if(res.response && res.response.length){
      //       this.product = res.response
      //       console.log(this.product);
      //     }
      //     else{
      //       console.log('error')
      //     }
      //   }
      // })
  }
 

  
addProductToCart(){

}

}
