import { State } from '../../reducers/index';
import { Observable } from 'rxjs';
import { Quote } from './../../domain/quote.model';
import { QuoteService } from './../../services/quote.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers'
import * as actions from '../../actions/quote.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote$: Observable<Quote>;
  constructor(private fb: FormBuilder,
    private quoteService$: QuoteService,
    private store$: Store<fromRoot.State>) {
    this.form = this.fb.group({
      email: ["wang@163.com", Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ["", Validators.required]

    });
    //用Store的select()方法获取可观察对象，然后订阅观察，在状态变化之后做出反应。
    // this.quote$ = this.store$.select(fromRoot.getQuote);
    this.quote$ = this.store$.select(state => {
      return state.quote.quote;});

  }

  ngOnInit(): void {
    this.quoteService$.getQuote().subscribe(quote => {
      this.store$.dispatch({ type: actions.QUOTE_SUCCESS, payload: quote })
    })
  }

  onSubmit(form: FormGroup, event: Event) {
    event.preventDefault();
    console.log(JSON.stringify(form.value));
    console.log(form.valid);
  }

  validate(c: FormControl): { [key: string]: any } | null {
    if (!c.value) {
      return null;
    }
    const pattern = /^wang+/;
    if (pattern.test(c.value)) {
      return null;
    } else {
      return {
        emailNotValid: 'The email must start with wang'
      }
    }
  }

}
