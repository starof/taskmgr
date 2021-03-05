import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { Identity, IdentityType } from 'src/app/domain';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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
  identityTypes: { value: IdentityType; label: string }[] = [
    { value: IdentityType.IdCard, label: '身份证' },
    { value: IdentityType.Insurance, label: '医保' },
    { value: IdentityType.Passport, label: '护照' },
    { value: IdentityType.Military, label: '军官证' },
    { value: IdentityType.Other, label: '其它' }
  ];
  identity: Identity = { identityType: IdentityType.Other, identityNo: '' };
  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();
  private _sub: Subscription;
  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => { };

  constructor() { }


  ngOnInit(): void {
    const idType$ = this.idType;
    const idNo$ = this.idNo;
    const val$ = combineLatest([idType$, idNo$]).pipe(
      map(([_type, _no]) => ({
        identityType: _type,
        identityNo: _no
      }))
    );
    this._sub = val$.subscribe(v => {
      this.identity = v;
      this.propagateChange(v);
    });
  }

  ngOnDestroy(): void {
    if(this._sub){
      this._sub.unsubscribe();
    }
  }

  writeValue(obj: any): void {
    if(obj){
      this.identity = obj;
    }
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
  if (!c.value) {
    return null;
  }
  switch (c.value.identityType) {
    case IdentityType.IdCard: {
      return this.validateIdNumber(c);
    }
    case IdentityType.Passport: {
      return this.validatePassport(c);
    }
    case IdentityType.Military: {
      return this.validateMilitary(c);
    }
    case IdentityType.Insurance:
    default: {
      return null;
    }
  }
}

private validateIdNumber(c: FormControl): { [key: string]: any } | null {
  const val = c.value.identityNo;
  if (val.length !== 18) {
    return {
      idNotValid: true
    };
  }
  const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
  let result = false;
  if (pattern.test(val)) {
    const info = extractInfo(val);
    if (isValidAddr(info.addrCode) && isValidDate(info.dateOfBirth)) {
      result = true;
    }
  }
  return result ? null : { idNotValid: true };
}

private validatePassport(c: FormControl): { [key: string]: any } | null {
  const value = c.value.identityNo;
  if (value.length !== 9) {
    return { idNotValid: true };
  }
  const pattern = /^[GgEe]\d{8}$/;
  let result = false;
  if (pattern.test(value)) {
    result = true;
  }
  return result ? null : { idNotValid: true };
}

private validateMilitary(c: FormControl): { [key: string]: any } | null {
  const value = c.value.identityNo;
  const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
  let result = false;
  if (pattern.test(value)) {
    result = true;
  }
  return result ? null : { idNotValid: true };
}


  onIdTypeChange(idType: IdentityType) {
    this._idType.next(idType);
  }

  onIdNoChange(idNo: string) {
    this._idNo.next(idNo);
  }

  private get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }

  private get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }

  

}
