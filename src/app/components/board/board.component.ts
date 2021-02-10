import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../../services/CRUD.service';
import { Status } from '../../status.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  project: any;
  tasks: any;
  project_id = localStorage.getItem('current_project');

  constructor(private CRUDService: CRUDService) {}

  ngOnInit(): void {
    this.CRUDService.getRequest(`/projects/${this.project_id}`).subscribe({
      next: (data) => {
        this.project = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.CRUDService.getRequest(`/tasks/${this.project_id}`).subscribe({
      next: (data: any) => {
        this.tasks = data.sort((a, b) => b.story_points - a.story_points);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeFromSprint(id) {
    const conf = window.confirm(
      `Are you sure you want to remove the task from sprint?`
    );
    if (conf) {
      this.CRUDService.putRequest(`/tasks/edit/${id}`, {
        status_in_project: Status.ToDo,
        sprint: 0,
      }).subscribe(
        (data: any) => {
          location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  changeStatus(id, status_num) {
    this.CRUDService.putRequest(`/tasks/edit/${id}`, {
      status_in_sprint: status_num,
    }).subscribe(
      (data: any) => {
        location.reload();
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
      location.reload();
    }
  }

  updateProject(id) {
    this.CRUDService.putRequest(`/projects/edit/${id}`, {
      sprint: this.project.sprint + 1,
    }).subscribe(
      (data: any) => {
        this.project = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateTask(id) {
    this.CRUDService.putRequest(`/tasks/edit/${id}`, {
      status_in_project: Status.Done,
      status_in_sprint: 0,
    }).subscribe(
      (data: any) => {
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
