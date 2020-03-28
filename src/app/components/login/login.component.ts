import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FetchingService } from 'src/app/services/fetching/fetching.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, 
    private router: Router, private fetching: FetchingService,
    private snackBar: MatSnackBar) {
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
        this.router.navigate(['/']);
        this.fetching.hide();
      })
      .catch(err => {
        this.fetching.hide();
        this.snackBar.open('Wrong email or password!');
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginBtnClick() {
    this.loginFormSubmit();
  }


}
