import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../../services/CRUD.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Status } from '../../status.enum';

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.scss'],
})
export class ProjectBacklogComponent implements OnInit {
  tasks: any;
  project: any;

  constructor(
    private CRUDService: CRUDService,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit(): void {
    const project_id = localStorage.getItem('current_project');
    this.CRUDService.getRequest(`/tasks/${project_id}`).subscribe({
      next: (data: any) => {
        this.tasks = data.sort(
          (a, b) =>
            a.status_in_project.localeCompare(b.status_in_project) ||
            b.story_points - a.story_points
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.CRUDService.getRequest(`/projects/${project_id}`).subscribe({
      next: (data) => {
        this.project = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteTask(id) {
    const conf = window.confirm(`Are you sure you want to delete this task?`);
    if (conf) {
      const projectId = localStorage.getItem('current_project');
      this.CRUDService.deleteRequest(
        `/tasks/${projectId}/tasks/${id}`
      ).subscribe(
        (data: any) => {
          this.flashMessages.show(
            `The task with the name ${data.name} was successfully deleted`,
            {
              cssClass: 'alert-danger',
              timeout: 2000,
            }
          );
          location.reload();
        },
        (err) => {
          this.flashMessages.show('error', {
            cssClass: 'alert-danger',
            timeout: 2000,
          });
        }
      );
    }
  }

  addTaskToSprint(id) {
    this.CRUDService.putRequest(`/tasks/edit/${id}`, {
      status_in_project: Status.InProgress,
      sprint: this.project.sprint,
      status_in_sprint: 1,
    }).subscribe(
      (data: any) => {
        location.reload();
      },
      (err) => {
        this.flashMessages.show('error', {
          cssClass: 'alert-danger',
          timeout: 2000,
        });
      }
    );
  }
}
