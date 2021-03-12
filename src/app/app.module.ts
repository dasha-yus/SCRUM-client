import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { IsLoggedIn } from './isLogged.guard';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BoardComponent } from './components/board/board.component';
import { HomeComponent } from './components/home/home.component';
import { RegComponent } from './components/auth/reg/reg.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProjectBacklogComponent } from './components/project-backlog/project-backlog.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { NewTaskComponent } from './components/task/new-task/new-task.component';
import { EditTaskComponent } from './components/task/edit-task/edit-task.component';
import { NotFoundComponent } from './components/404/404.component';
import { PasswordValidatorDirective } from './components/auth/reg/password-validator.directive';

const appRoute: Routes = [
  { path: '', component: HomeComponent, canActivate: [IsLoggedIn] },
  { path: 'reg', component: RegComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'backlog',
    component: ProjectBacklogComponent,
    canActivate: [IsLoggedIn],
  },
  {
    path: 'new-project',
    loadChildren: () =>
      import('./new-project/new-project.module').then(
        (m) => m.NewProjectModule
      ),
    canActivate: [IsLoggedIn],
  },
  { path: 'new-task', component: NewTaskComponent, canActivate: [IsLoggedIn] },
  { path: 'edit/:id', component: EditTaskComponent, canActivate: [IsLoggedIn] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    BoardComponent,
    HomeComponent,
    RegComponent,
    AuthComponent,
    ProjectBacklogComponent,
    NewProjectComponent,
    NewTaskComponent,
    EditTaskComponent,
    NotFoundComponent,
    PasswordValidatorDirective,
  ],

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
  ],

  providers: [AuthService, IsLoggedIn],
  bootstrap: [AppComponent],
})
export class AppModule {}
