import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { IProduct } from "./product";
import { ProductService } from "./product.services";

@Component({
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy
{
  PageTitle:string='Product List';
  imageShow:boolean=false;
  imageWidth:number=50;
  imageMargin:number=2;
  errorMessage:string='';
  private _listFilter:string='';
  sub:Subscription| undefined;

  get listFilter():string{
    return this._listFilter;
  }
  set listFilter(value: string)
  {
    this._listFilter=value;
    console.log('In setter' ,value);
    this.filterProducts = this.performeFilter(value);
  }
  filterProducts: IProduct[] = [];
  products:IProduct[]=[];

constructor(private productServices: ProductService)
{ 
}

performeFilter(filterBy:string): IProduct[]{
  filterBy = filterBy.toLocaleLowerCase();
  return this.products.filter((product:IProduct)=>
  product.productName.toLocaleLowerCase().includes(filterBy))
}
toggleImage():void{
  this.imageShow = !this.imageShow;
}

ngOnInit(): void {
    this.sub=this.productServices.getProducts().subscribe({
      next: products => {
        this.products= products;
        this.filterProducts = this.products;
      },
      error: err => this.errorMessage =err
    });
    
}
ngOnDestroy(): void {
    this.sub?.unsubscribe();
}
onRatingClicked(message:string):void
{
  this.PageTitle= 'Proctlisr ' + message;
}

}