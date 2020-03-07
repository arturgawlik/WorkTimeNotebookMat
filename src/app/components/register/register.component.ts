import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      passwords: this.fb.group({
        password: ['', [Validators.required]],
        passwordRepeated: ['', [Validators.required]]
      })
    });
  }


  registerFormSubmit() {
    if (this.registerForm.valid) {
      
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  registerBtnClick() {
    this.registerFormSubmit();
  }

}
