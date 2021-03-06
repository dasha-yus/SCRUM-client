import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../../services/CRUD.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Project } from '../../models/project';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
  name: string;
  description: string;

  constructor(
    private CRUDService: CRUDService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit(): void {}

  addNewProject() {
    if (this.name == undefined) {
      this.flashMessages.show('Name is not entered', {
        cssClass: 'alert-danger',
        timeout: 2000,
      });
    } else if (this.description == undefined) {
      this.flashMessages.show('Description is not entered', {
        cssClass: 'alert-danger',
        timeout: 2000,
      });
    } else {
      const project: Project = {
        author: localStorage.getItem('user_id'),
        name: this.name,
        description: this.description,
      };
      this.CRUDService.postRequest('/projects/new-project', project).subscribe(
        (data: Project) => {
          localStorage.setItem('current_project', data._id);
          this.router.navigate([`/`]);
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
