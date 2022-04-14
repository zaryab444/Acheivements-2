import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './component/cart-icon/cart-icon.component';
import {BadgeModule} from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import { CartPageComponent } from './component/cart-page/cart-page.component';
export const usersRoutes: Route[]=[];

const routes : Routes =[
  {
    path:'cart',
  
    component:CartPageComponent
  },
  // {
  //   path:'checkout',
  //   canActivate: [AuthGuard],
  //   component:CheckoutPageComponent
  // },
  // {
  //   path:'success',
  //   component: ThankyouPageComponent
  // }
]
@NgModule({
  imports: [
     CommonModule,
    RouterModule,
    BadgeModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    FormsModule,
    InputMaskModule,
    ReactiveFormsModule,
     RouterModule.forChild(routes)
],
  declarations: [
    CartIconComponent,
    CartPageComponent
  ],
  exports:[
    CartIconComponent,
    CartPageComponent
  ]
})

export class ordersModule{

  constructor(cartService: CartService){
    //for running only one time
    cartService.initCartLocalStorage();

  }
}
