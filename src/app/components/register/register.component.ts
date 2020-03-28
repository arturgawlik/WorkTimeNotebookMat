import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordsEquality } from 'src/app/utils/validators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FetchingService } from 'src/app/services/fetching/fetching.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth,
    private router: Router, private fetching: FetchingService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordRepeated: ['']
      }, { validators: passwordsEquality })
    });
  }


  registerFormSubmit() {
    if (this.registerForm.valid) {
      this.fetching.show();
      this.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.passwords.password)
        .then(r => {
          console.log(r);
          this.router.navigate(['/']);
          this.fetching.hide();
        })
        .catch(err => {
          console.log(err);
          this.fetching.hide();
          this.snackBar.open('Something goes wrong... :(');
        })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
