import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { AlertModule } from '../alert/alert.module';
import { ProductListComponent } from './product-list.component';
const routes: Routes = [
  {path: '', component: ProductListComponent, pathMatch: 'full'}
];
@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    NgxLoadingModule.forRoot({}),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductModule { }
