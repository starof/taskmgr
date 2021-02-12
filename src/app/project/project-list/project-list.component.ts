import { NewProjectComponent } from './../new-project/new-project.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
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
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { dark: true } });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
    });
  }

}
