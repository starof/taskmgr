import { UserService } from './../../services/user.service';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './../../domain/user.model';
import { FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, Form, FormBuilder, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, OnInit } from '@angular/core';

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
    if (this.multiple) {
      //把数组转成字典
      const userEntities: { [key: string]: User } = obj.reduce((e, c) => ({ ...e, [c.id]: c }), {})
      if (this.items) {
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj];
      }
    } else {
      this.items = [...obj];
    }
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

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
