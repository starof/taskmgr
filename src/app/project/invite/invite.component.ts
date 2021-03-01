import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from './../../domain/user.model';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  members: User[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<InviteComponent>) { }

  ngOnInit(): void {
    this.members = [...this.data.members];
  }
  onSave() {

  }

  onSubmit(ev: Event, { valid, value }: NgForm) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }
}
