import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  title = '';
  coverImages = [];
  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    private fb: FormBuilder) {
      this.coverImages = this.data.thumbnails;
    if (this.data.project) {
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
      this.title="修改项目";
    } else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [],
        coverImg: [this.data.img]
      });
      this.title="创建项目";
    }

  }

  ngOnInit(): void {
  }
  onSubmit(form: FormGroup, e: Event) {
    e.preventDefault();
    const { value, valid } = form;
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }
}
