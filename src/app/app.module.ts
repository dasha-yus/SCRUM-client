import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';

import { CheckFormService } from './services/check-form.service';
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
import { NewTaskComponent } from './components/new-task/new-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

const appRoute: Routes = [
  { path: '', component: HomeComponent, canActivate: [IsLoggedIn] },
  { path: 'reg', component: RegComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'backlog', component: ProjectBacklogComponent, canActivate: [IsLoggedIn] },
  { path: 'new-project', component: NewProjectComponent, canActivate: [IsLoggedIn] },
  { path: 'new-task', component: NewTaskComponent, canActivate: [IsLoggedIn] },
  { path: 'edit/:id', component: EditTaskComponent, canActivate: [IsLoggedIn] },
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
  ],

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
  ],

  providers: [CheckFormService, AuthService, IsLoggedIn],
  bootstrap: [AppComponent],
})
export class AppModule {}
