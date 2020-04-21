import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-work-time-note-entity',
  templateUrl: './add-edit-work-time-note-entity.component.html',
  styleUrls: ['./add-edit-work-time-note-entity.component.scss']
})
export class AddEditWorkTimeNoteEntityComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      'id': [''],
      'type': ['', Validators.required],
      'customer': ['', Validators.required],
      'description': ['', Validators.required],
      'url': ['', Validators.required],
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
      // 'timeSpendInMinutes': [0, Validators.required]
    });
  }

}
