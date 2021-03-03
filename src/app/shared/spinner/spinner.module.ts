import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SpinnerDirective} from './directives/spinner.directive';


@NgModule({
  declarations: [
    SpinnerDirective,
  ],
  exports: [
    SpinnerDirective
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ]
})
export class SharedSpinnerModule { }
