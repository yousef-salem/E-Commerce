import { Injectable } from '@angular/core';
import { Cart } from 'src/app/model/Cart';
import { ApiService } from 'src/app/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private apiService : ApiService) { }

  AddCarts(cart : Cart){
    return this.apiService.add<any>('/carts', cart) ;
  }
  onResponseSuccess(Title :string, body : string){
    this.apiService.onResponseSuccess(Title, body);
  }
  onResponsefaild(error : any){
    this.apiService.onResponsefaild(error);
  }
}
