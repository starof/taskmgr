import { UserService } from './../../services/user.service';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './../../domain/user.model';
import { FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, Form, FormBuilder, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    }
  ]
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {
  // @ViewChild('autoMember', { static: true }) autoMember: MatAutocomplete;
  @Input() multiple = true;
  @Input() placeholderText = "请输入成员 email";
  @Input() label = "添加/修改成员";
  form: FormGroup;
  items: User[] = [];
  members: User[] = [];
  memberResults$: Observable<User[]> | undefined;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      memberSearch: [''],

    })
  }

  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => { };

  ngOnInit(): void {
    this.memberResults$ = this.form.get('memberSearch')?.valueChanges //输入流
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(s => s && s.length > 1),
        switchMap(str => this.userService.searchUsers(str)));

  }

  writeValue(obj: User[]): void {
    if (obj && this.multiple) {
      //把数组转成字典
      const userEntities: { [key: string]: User } = obj.reduce((e, c) => ({ ...e, [<string>c.id]: c }), {})
      if (this.items) {
        const remaining = this.items.filter(item => !userEntities[<string>item.id]);
        this.items = [...remaining, ...obj];
      }
    } else if (obj && !this.multiple) {
      this.items = [...obj];
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
    return this.items ? null : {
      chipListInvalid: {
        valid: false
      }
    }
  }

  removeMember(member: User) {
    const ids = this.items.map(item => item.id);
    const i = ids.indexOf(member.id);
    if (this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)]
    } else {
      this.items = [];
    }
    this.form.patchValue({ memberSearch: '' });
    this.propagateChange(this.items);
  }

  handleMemberSelection(member: User) {
    if (this.items.map(item => item.id).indexOf(member.id) !== -1) {
      return;
    }
    this.items = this.multiple ? [...this.items, member] : [member];
    this.form.patchValue({ memberSearch: member.name });
    this.propagateChange(this.items);
  }

  displayUser(user: User): string {
    return user && user.name ? user.name : '';
  }

  get displayInput() {
    return this.multiple || this.items.length === 0;
  }
}
