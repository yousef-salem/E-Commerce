import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from 'src/app/model/Product';
import { CartItem } from 'src/app/model/CartItem';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{
  products:Product[]=[];
  categories:string[]=[];
  category:string = "All";
  isLoading : boolean = false;
  cartProducts : CartItem[]= [];
  tempCartItem! : CartItem ;
  constructor(private productService : ProductsService){
   
  }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
  getProducts(){
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next:(res)=>{
        this.isLoading = false;
        this.products = res;
        this.productService.onResponseSuccess('Success', 'Products Loaded');
      },error:(err)=>{
        this.isLoading = false;
        this.productService.onResponsefaild(err);
      }
    })
  }
  getCategories(){
    this.isLoading = true;
    this.productService.getAllCategorys().subscribe({
      next:(res)=>{
        this.isLoading = false;
        this.categories = res;
        this.productService.onResponseSuccess('Success', 'Products Loaded');
      },error:(err)=>{
        this.isLoading = false;
        this.productService.onResponsefaild(err);
      }
    })
  }
 filterByCategory($event : any){
  console.log($event);
    if($event == "All"){
      this.getProducts();
    }else{
      this.getProductsBCategory($event);
    }
  }
  getProductsBCategory(category : string){
    this.isLoading = true;
    this.productService.getProductsByCategory(category).subscribe({
      next:(res)=>{
        this.isLoading = false;
        this.products = res;
        this.productService.onResponseSuccess('Success', 'Products Loaded');
      },error:(err)=>{
        this.isLoading = false;
        this.productService.onResponsefaild(err);
      }
    })
  }
  addToCart($event : any){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find((item : CartItem)=> item.product.id == $event.product.id);
      if(exist){
        exist.quantity = $event.quantity;
      }else{
      
        this.cartProducts.push($event);
      }
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }else{
      this.cartProducts.push($event);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
  }
}
