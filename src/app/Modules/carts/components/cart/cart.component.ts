import { Component } from '@angular/core';
import { CartItem } from 'src/app/model/CartItem';
import { CartsService } from '../../service/carts.service';
import { Cart } from 'src/app/model/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  isDone = false;
  products : CartItem[] = [];
  constructor(private cartService : CartsService){
    this.getCartItems();
  }

  getCartItems(){
    if("cart" in localStorage){
      this.products = JSON.parse(localStorage.getItem("cart")!);
    }else{
      this.products = [];
    }
  }
  getTotal(){
    let total = 0;
    this.products.forEach((item)=>{
      total += item.product.price * item.quantity;
    })
    return  parseFloat(total.toFixed(2));
  }
  decreaseQuantity(item : CartItem){
    if(item.quantity > 1){
      item.quantity--;
      localStorage.setItem("cart", JSON.stringify(this.products));
    }
  }
  increaseQuantity(item : CartItem){
    if(item.quantity < 10){
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(this.products));
    }
  }
  deleteItem(item : CartItem){
    let index = this.products.indexOf(item);
    this.products.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(this.products));
  }
  clearCart(){
    this.products = [];
    localStorage.removeItem("cart");
  }

  addCart(){
    if("cart" in localStorage){
      this.products = JSON.parse(localStorage.getItem("cart")!);
    }
    let cart = {
      userId : 1,
      date : new Date().toISOString(),
      products : this.products.map((item)=>{
        return {
          productId : item.product.id,
          quantity : item.quantity
        }
      })
    } as Cart;
    
    this.cartService.AddCarts(cart).subscribe({
      next:(res)=>{
        this.isDone = true;
        this.products = [];
        localStorage.removeItem("cart");
        this.cartService.onResponseSuccess('Success', 'Cart Added');
      },error:(err)=>{
        this.cartService.onResponsefaild(err);
      }
    }
  
    );
  }
}
