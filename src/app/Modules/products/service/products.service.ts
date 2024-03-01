import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ApiService } from 'src/app/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService : ApiService) { }

  getProduct(id:number){
    return this.apiService.getById<Product>('/products/'+id) ; 
  }
  getAllProducts(){
    return this.apiService.getAll<Product[]>('/products') ;
  }

  getAllCategorys(){
    return this.apiService.getAll<string[]>('/products/categories') ;
  }
  getProductsByCategory(category : string){
    return this.apiService.getAll<Product[]>('/products/category/'+category) ;
  }

  onResponseSuccess(Title :string, body : string){
    this.apiService.onResponseSuccess(Title, body);
  }
  onResponsefaild(error : any){
    this.apiService.onResponsefaild(error);
  }
}
