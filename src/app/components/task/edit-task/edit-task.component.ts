import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../../../services/CRUD.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-edit-task',
  templateUrl: '../task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  name: string;
  description: string;
  sp: number;
  task: Task;
  id: string;
  projectId: string = localStorage.getItem('current_project');
  action: string = 'Edit task';

  constructor(
    private CRUDService: CRUDService,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.CRUDService.getRequest(
      `/tasks/${this.projectId}/tasks/${this.id}`
    ).subscribe({
      next: (data: Task) => {
        this.name = data.name;
        this.description = data.description;
        this.sp = data.story_points;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  submit() {
    const task: Task = {
      name: this.name,
      description: this.description,
      story_points: this.sp,
    };
    this.CRUDService.putRequest(`/tasks/edit/${this.id}`, task).subscribe(
      (data: Task) => {
        this.task = data;
        this.router.navigate([`/backlog`]);
      },
      (err) => {
        this.flashMessages.show(err, {
          cssClass: 'alert-danger',
          timeout: 2000,
        });
      }
    );
  }
}
