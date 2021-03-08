import { extractInfo, getAddrByCode, isValidAddr } from './../../utils/identity.util';
import { isValidDate } from './../../utils/date.util';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { parseISO } from 'date-fns';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  items: string[] = [];
  sub?: Subscription;
  private readonly avatarName = 'avatars';
  constructor(private fb: FormBuilder) {
    const img = `${this.avatarName}:svg-${(Math.random() * 16).toFixed()}`;
    this.form = this.fb.group({
      email: [],
      name: [],
      password: [],
      repeat: [],
      avatar: [img],
      dateOfBirth: [],
      address: [],
      identity: []
    })

    const identity = this.form.get('identity');

    const id$ = identity!.valueChanges.pipe(
      debounceTime(300), //滤波
      filter(v => identity!.valid)
    );

    this.sub = id$?.subscribe(id => {
      const info = extractInfo(id.identityNo);
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        // this.form.get('address')?.patchValue(addr);
        this.form.patchValue({ address: addr });
        this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
      if (isValidDate(info.dateOfBirth)) {
        this.form.get('dateOfBirth')?.patchValue(parseISO(info.dateOfBirth));
      }
    })
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit() {

    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.items = nums.map(d => `avatars:svg-${d}`);


  }

  onSubmit({ value, valid }: FormGroup, e: Event) {
    e.preventDefault();
    if (!valid) {
      return;
    }
    console.log(value);
  }


}
