import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Product, ProductsService } from '@bluebits/product';
import { Subject, takeUntil } from 'rxjs';
import { cartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
cartItemsDetailed : cartItemDetailed[] = [];
  cartCount = 0;
  endsubs$ : Subject<any> = new Subject();
  products:Product;
  public product: any[] = [];
  constructor(
    private router: Router, 
    private cartService: CartService, 
    private productService: ProductsService,
       private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  //  this.route.params.subscribe(params =>{
  //     if(params.id){
  //      this._getCartDetails(params.id);
  //     }
    // })
         
      if(this.products.productId){
         this._getCartDetails(this.products.productId);
      }
    
  }

  ngOnDestroy(){
    this.endsubs$.next;
    this.endsubs$.complete();
  }

  private _getCartDetails(data){
       this.cartService.cart$.pipe(takeUntil(this.endsubs$)).subscribe((respCart)=>{
         this.cartItemsDetailed =[];
       this.cartCount = respCart?.items.length ?? 0;
       respCart.items.forEach((cartItem)=>{
        
        //let data
    const numberValue = Number(data)

     const obj = {Id : numberValue }
     // const obj = {Id : 1 }
        this.productService.getProductById(obj)
            .then((res: any) => {
            
                if (res && !res.status && res.response.length) {
                   this.product = res.response;
                  
           this.cartItemsDetailed.push({
             product: res,
             qunatity: cartItem.quantity
           })  
                }
            }).catch((err: HttpErrorResponse) => (console.log))
        //  this.productService.getProductById(obj).subscribe(respProduct =>{
               
        
        //    console.log(respProduct)

        //    this.cartItemsDetailed.push({
        //      product: respProduct,
        //      qunatity: cartItem.quantity
        //    })
        //  })
       })
       })
  }

  backToShop(){
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem : cartItemDetailed){
    this.cartService.deleteCartItem(cartItem.product.id
      )
  }

   updateCartItemQuantity(event, cartItem: cartItemDetailed){
    console.log(event.value);
    this.cartService.setCartItem({

      productId: cartItem.product.id,
      quantity: event.value
    }, true)

  }
}
