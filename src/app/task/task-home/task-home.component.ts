import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  openNewTaskDialog() {

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