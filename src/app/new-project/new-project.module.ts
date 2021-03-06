import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedIn } from '../isLogged.guard';
import { NewProjectComponent } from '../components/new-project/new-project.component';

const routes: Routes = [
  { path: '', component: NewProjectComponent, canActivate: [IsLoggedIn] },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NewProjectModule { }
