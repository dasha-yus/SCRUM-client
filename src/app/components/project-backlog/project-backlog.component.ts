import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../../services/CRUD.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Status } from '../../status.enum';
import { Task } from '../../models/task';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.scss'],
})
export class ProjectBacklogComponent implements OnInit {
  tasks: Task[] = [];
  project: Project;
  project_id: string = localStorage.getItem('current_project');

  constructor(
    private CRUDService: CRUDService,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit(): void {
    if (!this.project_id) this.project_id = '';
    this.CRUDService.getRequest(`/tasks/${this.project_id}`).subscribe({
      next: (data: Task[]) => {
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
    this.CRUDService.getRequest(`/projects/${this.project_id}`).subscribe({
      next: (data: Project) => {
        this.project = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteTask(id: string) {
    const conf = window.confirm(`Are you sure you want to delete this task?`);
    if (conf) {
      const projectId = localStorage.getItem('current_project');
      this.CRUDService.deleteRequest(
        `/tasks/${projectId}/tasks/${id}`
      ).subscribe(
        (data: Task) => {
          this.flashMessages.show(
            `The task with the name ${data.name} was successfully deleted`,
            {
              cssClass: 'alert-danger',
              timeout: 2000,
            }
          );
          this.ngOnInit();
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

  addTaskToSprint(id: string) {
    this.CRUDService.putRequest(`/tasks/edit/${id}`, {
      status_in_project: Status.InProgress,
      sprint: this.project.sprint,
      status_in_sprint: 0,
    }).subscribe(
      (data: Task) => {
        this.ngOnInit();
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
