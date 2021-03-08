import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Address } from 'src/app/domain/user.model';
import { getAreasByCity, getCitiesByProvince, getProvinces } from 'src/app/utils/area.util';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaListComponent implements OnInit, OnDestroy, ControlValueAccessor {
  _address: Address = {
    province: '',
    city: '',
    district: '',
    street: ''
  };
  _province = new Subject<string>();
  _city = new Subject<string>();
  _district = new Subject<string>();
  _street = new Subject<string>();
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;
  provinces = getProvinces();
  private _sub: Subscription;

  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => { };

  constructor() {
    const province$ = this._province.asObservable().pipe(startWith(''));
    const city$ = this._city.asObservable().pipe(startWith(''));
    const district$ = this._district.asObservable().pipe(startWith(''));
    const street$ = this._street.asObservable().pipe(startWith(''));
    const val$ = combineLatest([province$, city$, district$, street$]).pipe(
      map(([_p, _c, _d, _s]) => ({
        province: _p,
        city: _c,
        district: _d,
        street: _s
      }))
    );
    this._sub = val$.subscribe(v => {
      this.propagateChange(v);
    });

    // 根据省份的选择得到城市列表
    this.cities$ = province$.pipe(
      map(province => getCitiesByProvince(province))
    );
    // 根据省份和城市的选择得到地区列表
    this.districts$ = combineLatest([province$, city$]).pipe(
      map(([p, c]) => getAreasByCity(p, c))
    );
  }


  ngOnInit(): void {

  }

  writeValue(obj: any): void {
    if (obj) {
      this._address = obj;
      if (this._address.province) {
        this._province.next(this._address.province);
      }
      if (this._address.city) {
        this._city.next(this._address.city);
      }
      if (this._address.district) {
        this._district.next(this._address.district);
      }
      if (this._address.street) {
        this._street.next(this._address.street);
      }
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
    const val = c.value;
    if (!val) {
      return null;
    }
    if (
      val.province &&
      val.city &&
      val.district &&
      val.street &&
      val.street.length >= 4
    ) {
      return null;
    }
    return {
      addressNotValid: true
    };
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  onProvinceChange() {
    this._province.next(this._address.province);
  }

  onCityChange() {
    this._city.next(this._address.city);
  }

  onDistrictChange() {
    this._district.next(this._address.district);
  }

  onStreetChange() {
    this._street.next(this._address.street);
  }
}
