import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      email: new FormControl("wang@163.com", Validators.compose([Validators.required, Validators.email])),
      password: new FormControl("",Validators.required),
    })
  }

  ngOnInit(): void {

  }

  onSubmit(form: FormGroup, event: Event) {
    event.preventDefault();
    console.log(JSON.stringify(form.value));
    console.log(form.valid);
  }

}
