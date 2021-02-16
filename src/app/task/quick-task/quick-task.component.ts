import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {
  desc: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm, event: Event) {
    console.log(f)
    console.log(JSON.stringify(f.value));
    console.log(JSON.stringify(f.valid))
  }
}
