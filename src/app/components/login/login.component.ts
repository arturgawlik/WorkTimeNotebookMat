import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  loginFormSubmit() {
    if (this.loginForm.valid) {
      this.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginBtnClick() {
    this.loginFormSubmit();
  }


}
