import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../../services/CRUD.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Project } from '../../models/project';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private CRUDService: CRUDService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      decription: new FormControl('', Validators.required),
    });
  }

  addNewProject() {
    const project: Project = {
      author: localStorage.getItem('user_id'),
      name: this.myForm.controls['name'].value,
      description: this.myForm.controls['decription'].value,
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
