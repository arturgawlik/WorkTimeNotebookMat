import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Note, NoteDTO, NoteFormValue } from 'src/app/models/note';
import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { AngularFireAuth } from '@angular/fire/auth';
import { FetchingService } from 'src/app/services/fetching/fetching.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { AddNote } from 'src/app/store/noteList/note.actions';
import { NoteFormState } from 'src/app/store/noteForm/note-form.state';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-work-time-note-entity',
  templateUrl: './add-edit-work-time-note-entity.component.html',
  styleUrls: ['./add-edit-work-time-note-entity.component.scss']
})
export class AddEditWorkTimeNoteEntityComponent implements OnInit {

  form: FormGroup;
  notesCollection: AngularFirestoreCollection<Note>;
  formFileds: { id: AbstractControl, type: AbstractControl, customer: AbstractControl, description: AbstractControl, url: AbstractControl, startDate: AbstractControl, endDate: AbstractControl };
  userId: string;
  loading = false;

  constructor(private fb: FormBuilder,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private fetchingService: FetchingService,
    private snackBar: MatSnackBar,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.notesCollection = this.firestore.collection<Note>('/notes');
    this.auth.user.subscribe(u => this.userId = u.uid);
    this.store.select(NoteFormState.noteForm).subscribe(x => {
      if (x)
        this.form.setValue({...x, id: ''})
    });
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
    });
    this.formFileds = {
      id: this.form.get('id'),
      type: this.form.get('type'),
      customer: this.form.get('customer'),
      description: this.form.get('description'),
      url: this.form.get('url'),
      startDate: this.form.get('startDate'),
      endDate: this.form.get('endDate')
    }
  }

  submit() {
    if (this.form.valid) {
      const dto = new NoteDTO(this.form.value as NoteFormValue, this.userId);
      this.toggleLoading(true);
      this.notesCollection.add({ ...dto })
        .then(r => {
          this.store.dispatch(new AddNote(dto));
          this.toggleLoading(false);
          this.initForm();
        })
        .catch(r => {
          this.snackBar.open('An error occurred while adding a new note!');
          this.toggleLoading(false);
        });
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  markAllFieldsAsTouched() {
    this.formFileds.type.markAsTouched();
    this.formFileds.customer.markAsTouched();
    this.formFileds.description.markAsTouched();
    this.formFileds.url.markAsTouched();
    this.formFileds.startDate.markAsTouched();
    this.formFileds.endDate.markAsTouched();
  }

  toggleLoading(isloading: boolean) {
    this.toggleDisable(isloading);
    if (isloading) {
      this.loading = true;
      this.fetchingService.show();
    } else {
      this.loading = false;
      this.fetchingService.hide();
    }
  }

  toggleDisable(isLoading: boolean) {

    if (isLoading) {
      this.formFileds.type.disable();
      this.formFileds.customer.disable();
      this.formFileds.description.disable();
      this.formFileds.url.disable();
      this.formFileds.startDate.disable();
      this.formFileds.endDate.disable();
    } else {
      this.formFileds.type.enable();
      this.formFileds.customer.enable();
      this.formFileds.description.enable();
      this.formFileds.url.enable();
      this.formFileds.startDate.enable();
      this.formFileds.endDate.enable();
    }
  }

}
