import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../../services/CRUD.service';
import { Status } from '../../status.enum';
import { Project } from '../../models/project';
import { Task } from '../../models/task';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  project: Project = { name: '', author: '', description: '' };
  tasks: Task[] = [];
  project_id: string = localStorage.getItem('current_project');

  constructor(private CRUDService: CRUDService) {}

  ngOnInit(): void {
    if (!this.project_id) this.project_id = '';
    this.CRUDService.getRequest(`/projects/${this.project_id}`).subscribe({
      next: (data: Project) => {
        this.project = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.CRUDService.getRequest(`/tasks/${this.project_id}`).subscribe({
      next: (data: Task[]) => {
        this.tasks = data.sort((a, b) => b.story_points - a.story_points);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeFromSprint(id: string) {
    const conf = window.confirm(
      `Are you sure you want to remove the task from sprint?`
    );
    if (conf) {
      this.CRUDService.putRequest(`/tasks/edit/${id}`, {
        status_in_project: Status.ToDo,
        sprint: 0,
      }).subscribe(
        (data: Project) => {
          this.ngOnInit();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  changeStatus(id: string, status_num: number) {
    this.CRUDService.putRequest(`/tasks/edit/${id}`, {
      status_in_sprint: status_num,
    }).subscribe(
      (data: Project) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  canSwitchSprint(): boolean {
    return (
      this.filterBySprint.length === this.filterBySprintAndStatus.length &&
      this.filterBySprint.length !== 0
    );
  }

  switchSprint() {
    const conf = window.confirm(
      `Are you sure that the sprint number ${this.project.sprint} is finished?`
    );
    if (conf) {
      this.filterBySprintAndStatus.map((task) => {
        this.updateTask(task._id);
      });
      this.updateProject(this.project_id);
      this.ngOnInit();
    }
  }

  updateProject(id: string) {
    this.CRUDService.putRequest(`/projects/edit/${id}`, {
      sprint: this.project.sprint + 1,
    }).subscribe(
      (data: Project) => {
        this.project = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateTask(id: string) {
    this.CRUDService.putRequest(`/tasks/edit/${id}`, {
      status_in_project: Status.Done,
      status_in_sprint: 0,
    }).subscribe(
      (data: Project) => {
        this.project = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get filterBySprint() {
    return this.tasks.filter((task) => task.sprint == this.project.sprint);
  }

  get filterBySprintAndStatus() {
    return this.tasks
      .filter((task) => task.sprint == this.project.sprint)
      .filter((task) => task.status_in_sprint == 3);
  }
}
