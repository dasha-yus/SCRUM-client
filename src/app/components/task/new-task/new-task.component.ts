import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../../../services/CRUD.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-new-task',
  templateUrl: '../task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  name: string;
  description: string;
  sp: number;
  action: string = 'New task';

  constructor(
    private CRUDService: CRUDService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit(): void {}

  submit() {
    if (this.name == undefined) {
      this.flashMessages.show('Title is not entered', {
        cssClass: 'alert-danger',
        timeout: 2000,
      });
    } else if (this.description == undefined) {
      this.flashMessages.show('Description is not entered', {
        cssClass: 'alert-danger',
        timeout: 2000,
      });
    } else if (this.sp == undefined) {
      this.flashMessages.show('Story points are not defined', {
        cssClass: 'alert-danger',
        timeout: 2000,
      });
    } else {
      const projectId = localStorage.getItem('current_project');
      const task: Task = {
        name: this.name,
        description: this.description,
        story_points: this.sp,
      };

      this.CRUDService.postRequest(
        `/tasks/${projectId}/tasks/new`,
        task
      ).subscribe(
        (data: Task) => {
          this.router.navigate([`/backlog`]);
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
