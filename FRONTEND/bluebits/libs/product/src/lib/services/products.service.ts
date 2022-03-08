import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import {environment} from '@env/environment';
import { Product } from "../models/product";
import { catchError, map, tap } from 'rxjs/operators';
import { BaseService } from "./base.service";
export interface FoodListModelServerResponse {
  count: number;
  stores: Product[];
  }



@Injectable({
  providedIn: 'root'
})


export class ProductsService extends BaseService {

  apiURLProducts = environment.apiURL + 'Product/GetById';
  constructor(_http: HttpClient) {
    super(_http);
   }


  getAllProducts(): any{
    let headers = new HttpHeaders({
          'Authorization':'TgBLAFQAcgBhAEQAZQByAHMAOgBVAHMAZQByAEkARAA9ADEA',
      });
      let options = { headers: headers };
    const url = `${environment.apiURL}Product/GetById`;
     return this.get(url,options);
    }










  getProducts(categoriesFilter?: string[]): Observable  <Product[]>{
    //we use http params because in postman we filter product by category in params postman thats why we use http params
    let params = new HttpParams
    if(categoriesFilter){
      //we use array join to seperate the more categories ids when we check in postman
      params = params.append('categories',categoriesFilter.join(','),);
      console.log(params);
    }
    return this.get(this.apiURLProducts,{params: params});
  }

  //we remove array in <Category model> because its single get by id
  getProduct(productId: string): Observable  <Product>{
    return this.get(`${this.apiURLProducts}/${productId}` )
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.post(this.apiURLProducts, productData);
  }

  updateProduct(productData: FormData , productid: string): Observable<Product>{
    return this.put(`${this.apiURLProducts}/${productid}`,productData)
  }



  deleteProduct(productId: string): Observable<any> {
    return this.delete(`${this.apiURLProducts}/${productId}`);
  }

//for dashboard
  getProductsCount(): Observable<number> {
    return this
      .get(`${this.apiURLProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }





}
