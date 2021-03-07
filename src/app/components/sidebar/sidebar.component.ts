import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CRUDService } from '../../services/CRUD.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Project } from '../../models/project';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private router: Router,
    private CRUDService: CRUDService,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.CRUDService.getRequest('/projects').subscribe({
      next: (data: Project[]) => {
        this.projects = data;
      },
      error: (error) => {
        this.flashMessages.show(error.error.msg, {
          cssClass: 'alert-danger',
          timeout: 2000,
        });
      },
    });
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  getProjectId(id: string) {
    localStorage.setItem('current_project', id);
    location.reload();
  }

  compareProjectsIds(id: string) {
    const currentId = localStorage.getItem('current_project');
    return currentId === id;
  }

  deleteProject() {
    const id = localStorage.getItem('current_project');
    const conf = window.confirm(
      `Are you sure you want to delete this project?`
    );
    if (conf) {
      this.CRUDService.deleteRequest(`/projects/${id}`).subscribe(
        (data: Project) => {
          localStorage.setItem('current_project', '');
          location.reload();
        },
        (err) => {
          this.flashMessages.show(err.error.msg, {
            cssClass: 'alert-danger',
            timeout: 2000,
          });
        }
      );
    }
  }
}
