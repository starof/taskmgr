import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    // this.form = new FormGroup({
    //   email: new FormControl("wang@163.com", Validators.compose([Validators.required, Validators.email])),
    //   password: new FormControl("",Validators.required),
    // })

    //formBuilder不需要显示的new FormControl
    this.form = this.fb.group({
      email: ["wang@163.com", Validators.compose([Validators.required, Validators.email]) ],
      password:["",Validators.required]

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
