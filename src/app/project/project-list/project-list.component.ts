import { filter, switchMap, map } from 'rxjs/operators';
import { Project } from './../../domain/project.model';
import { ProjectService } from './../../services/project.service';
import { listAnimation } from './../../animate/list.animate';
import { slideToRight } from './../../animate/router.animate';
import { InviteComponent } from './../invite/invite.component';
import { NewProjectComponent } from './../new-project/new-project.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import { values } from 'lodash';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  @HostBinding('@routeAnim') state: any;
  projects: Project[] = [];
  constructor(private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private projectService: ProjectService) {
    this.projectService.get("37489e0c-df34-c261-71c4-ce75357e3035").subscribe(
      projects => {
        this.projects = projects;
        this.cd.markForCheck();
      }
    );
  }

  ngOnInit(): void {

  }

  openNewProjectDialog() {
    const selectedImg = `/assets/images/covers/${Math.floor(Math.random() * 40)}_tn.jpg`
    const dialogRef = this.dialog.open(NewProjectComponent,
      {
        data: {
          subnails: this.getThumbnails(),
          img: selectedImg
        }
      });
    dialogRef.afterClosed()
      .pipe(
        filter(n => n),
        map(val => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) })),
        switchMap(v => this.projectService.add(v)))
      .subscribe(project => {
        this.projects = [...this.projects, project];
        this.cd.markForCheck();
      });
  }
  private getThumbnails() {
    return _.range(0, 40).map(i => `/assets/images/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
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
  launchConfirmDialog(project: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除项目',
        content: '您确定想删除该项目吗？'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id != project.id);
      this.cd.markForCheck();
    });
  }

}
