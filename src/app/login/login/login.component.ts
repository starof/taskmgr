import { Quote } from './../../domain/quote.model';
import { QuoteService } from './../../services/quote.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote: Quote = { cn: '满足感在于不断的努力，而不是现有成就。全心努力定会胜利满满。', pic: '/assets/images/quote_fallback.jpg', en: 'Satisfaction lies in the effort, not in the attainment. Full effort is full victory.' };
  constructor(private fb: FormBuilder, private quoteService$: QuoteService) {
    // this.form = new FormGroup({
    //   email: new FormControl("wang@163.com", Validators.compose([Validators.required, Validators.email])),
    //   password: new FormControl("",Validators.required),
    // })

    //formBuilder不需要显示的new FormControl
    this.form = this.fb.group({
      email: ["wang@163.com", Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ["", Validators.required]

    });
    this.quoteService$.getQuote().subscribe(quote => this.quote = quote)
  }

  ngOnInit(): void {

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
