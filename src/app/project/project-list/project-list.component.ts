import { slideToRight } from './../../animate/router.animate';
import { InviteComponent } from './../invite/invite.component';
import { NewProjectComponent } from './../new-project/new-project.component';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight]
})
export class ProjectListComponent implements OnInit {
  @HostBinding('@routeAnim') state: any;
  projects = [
    {
      id: 1,
      name: "企业协作平台",
      desc: "这是一个企业内部项目",
      coverImg: "assets/images/covers/0.jpg"
    },
    {
      id: 2,
      name: "自动化测试项目",
      desc: "这是一个企业内部项目",
      coverImg: "assets/images/covers/1.jpg"
    }
  ];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: '新建项目' } });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
    });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }
  launchEditDialog(project: any) {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        title: '修改项目',
        project
      }
    })
  }
  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除项目',
        content: '您确定想删除该项目吗？'
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

}
