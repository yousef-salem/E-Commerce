import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    ProductCardComponent
  ]
})
export class SharedModule { }
