import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', redirectTo: '/tasklist', pathMatch: 'full' },
    { path: 'login', loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule) },
    { path: 'projects', loadChildren: () => import('./project/project.module').then(mod => mod.ProjectModule) },
    { path: 'tasklist', loadChildren: () => import('./task/task.module').then(mod => mod.TaskModule) },
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
