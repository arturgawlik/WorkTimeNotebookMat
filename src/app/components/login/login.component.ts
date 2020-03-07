import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FetchingService } from 'src/app/services/fetching.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public auth: AngularFireAuth, private router: Router, private fetching: FetchingService) {
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
      this.fetching.show();
      this.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then(r => {
        console.log(r);
        this.router.navigate(['/']);
        this.fetching.hide();
      })
      .catch(err => {
        console.log(err);
        this.fetching.hide();
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginBtnClick() {
    this.loginFormSubmit();
  }


}
