import { CopyTaskComponent } from './../copy-task/copy-task.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../new-task/new-task.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openNewTaskDialog() {

  }
  launchNewTaskDialog() {
    this.dialog.open(NewTaskComponent, {
      data: {
        title: '新建任务'
      }
    });
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {
      data: {
        title: '修改任务',
        lists: this.lists
      }
    })
  }

  launchUpdateTaskDialog(task: any) {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: {
        title: '修改任务',
        task
      }
    })
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除任务列表',
        content: '您确定想删除该任务列表吗？'
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchNewListDialog(){
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: '新建任务列表'
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
  launchEditListDialog(){
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: '更改列表名称'
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  lists = [
    {
      id: 1,
      name: "待办",
      order: 1,
      tasks: [
        {
          id: 1,
          desc: "任务一： 去星巴克买咖啡",
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: "张三",
            avatar: "avatars:svg-11"
          },
          dueDate: new Date(),
          reminder: new Date()
        },
        {
          id: 2,
          desc: "任务一： 完成老板布置的PPT作业",
          completed: false,
          priority: 2,
          owner: {
            id: 2,
            name: "李四",
            avatar: "avatars:svg-12"
          },
          dueDate: new Date()
        }
      ]
    },
    {
      id: 2,
      name: "进行中",
      order: 2,
      tasks: [
        {
          id: 1,
          desc: "任务三： 项目代码评审",
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: "王五",
            avatar: "avatars:svg-13"
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: "任务一： 制定项目计划",
          completed: false,
          priority: 2,
          owner: {
            id: 2,
            name: "李四",
            avatar: "avatars:svg-12"
          },
          dueDate: new Date()
        }
      ]
    }
  ];


}
