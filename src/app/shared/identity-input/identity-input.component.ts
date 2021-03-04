import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => { };

  constructor() { }


  ngOnInit(): void {
  }

  writeValue(obj: any): void {

  }

  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }
  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  validate(c: FormControl): { [key: string]: any } | null {
    const val = c.value;
    return val ? null : {
      chipListInvalid: {
        valid: false
      }
    }
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
