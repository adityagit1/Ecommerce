import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BasesServices } from '../common-services/base_services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productDetail: any = [];
  productCount = 10
  categoryListData: any = [];
  categoryId: any = '';
  productDetailCopy: any;
  priceId: number = 0;
  productById: any;
  private _notification = null;
  public loading = false;
  private _subscribe: Subscription = <Subscription>{};
  get notification(): any {
    return this._notification;
  }

  set notification(value: any) {
    this._notification = value;
  }

  constructor(private _baseService: BasesServices
  ) {
  }

  ngOnInit(): void {
    this.getProductList()
    this.getAllcategory();

  }

  getProductList() {
    this.loading = true;
    this._subscribe = this._baseService.getProductList(this.productCount).subscribe((data: any) => {
      this.loading = false;
      if (data) {
        this.productDetail = data;
        this.productDetailCopy = this.productDetail
          this.sortArray()
    
      } else {
        this._notification = { type: 'error', message: 'No Data Found ' };
      }
    }, (error) => {
      this.loading = false;
      console.log("comming into error part ")
      this._notification = { type: 'error', message: error };
    })
  }

  /*  adding 10 more product when click  */
  loadMore() {
    this.productCount = this.productCount + 10;
    this.getProductList();
  }


  /*  sorting the array on the basis of price  */
  sortArray() {
    if (this.priceId == 1) {
      this.productDetail.sort((a: any, b): any => a.price - b.price)
    }
    else if (this.priceId == 2) {
      this.productDetail.sort((a: any, b): any => b.price - a.price)
    }
    else {
      this.productDetail = this.productDetailCopy
    }
  }



  /*  category list  */

  getAllcategory() {
    this.loading = true;
    this._baseService.getCategoryList('').subscribe(data => {
      this.loading = false;
      if (data) {
        this.categoryListData = data
      }
      else {
        this._notification = { type: 'error', message: 'No Data Found ' };
      }
    }, (error => {
      this.loading = false;
      this._notification = { type: 'error', message: error };
    }))
  }


  /*  calling the category using  api call  */
  selecteCategory() {
    if (this.categoryId) {
      this.loading = true;
      this._baseService.getCategoryList(this.categoryId).subscribe(data => {
        this.loading = false;
        if (data) {
          this.productDetail = data;
        }
        else {
          this._notification = { type: 'error', message: 'No Data Found ' };
        }
      }, (err) => {
        this.loading = false;
        this._notification = { type: 'error', message: err };
      });

    }

    else {
      this.getProductList()
    }
  }

  /*  modal data taken from the exiting data only  */
  showProduct(item) {
    this.productById = item;
  }
}
