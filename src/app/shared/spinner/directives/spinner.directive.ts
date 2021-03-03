import {ComponentFactoryResolver, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {NgxSpinnerComponent, NgxSpinnerService} from 'ngx-spinner';

type SpinnerType = 'ball-pulse';

interface SpinnerParams {
  bdColor: string;
  color: string;
  fullScreen: boolean;
  type: SpinnerType;
}

const spinnerParams: SpinnerParams = {
  bdColor: 'rgb(255, 255, 255, 0)',
  color: '#19247C',
  fullScreen: false,
  type: 'ball-pulse'
};

@Directive({
  selector: '[appSpinner]'
})
export class SpinnerDirective {
  @Input()
  set appSpinner(value: boolean) {
    this.handle(value);
  }

  private _hash = 'abcdefg';

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private spinner: NgxSpinnerService
  ) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxSpinnerComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    componentRef.instance.name = this._hash;
    componentRef.instance.bdColor = spinnerParams.bdColor;
    componentRef.instance.color = spinnerParams.color;
    componentRef.instance.fullScreen = spinnerParams.fullScreen;
    componentRef.instance.type = spinnerParams.type;

    const host = this.elementRef.nativeElement;
    host.insertBefore(componentRef.location.nativeElement, host.firstChild);
  }

  private handle(value: boolean) {
    value
      ? this.spinner.show(this._hash)
      : this.spinner.hide(this._hash);
  }

}
