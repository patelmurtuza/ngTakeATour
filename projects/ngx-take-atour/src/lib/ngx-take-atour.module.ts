import {CommonModule} from '@angular/common';
import {NgModule} from "@angular/core";
import { NgxTakeATourComponent } from './ngx-take-atour.component';

@NgModule({
  imports: [
    CommonModule 
  ],
  declarations: [NgxTakeATourComponent],
  exports: [NgxTakeATourComponent]
})
export class NgxTakeATourModule { }
