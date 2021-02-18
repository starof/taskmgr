import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {
  @Input() title = "选择"
  @Input() cols = 6;
  @Input() rowHight = '64px'
  @Input() items: string[] = [];
  @Input() useSvgIcon: boolean = false;
  @Input() itemWidth = '80px';
  selected: string = '';
  constructor() { }

  private propagateChange = (_: any) => { };

  //写值，设置控件的值form中setValue设置初始值，通过表单控件的writeValue方法设值。
  writeValue(obj: any): void {
    this.selected = obj;
  }
  //控件view发生变化，把变化emit给表单
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  //什么状态算touched，告诉表单
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  onChange(i: number) {
    this.selected = this.items[i];
    this.propagateChange(this.selected); //变化通知表单
  }

  validate(c: FormControl): { [key: string]: any } | null {
    return this.selected ? null : {
      imageListInvalid: {
        valid: false
      }
    }
  }

}
