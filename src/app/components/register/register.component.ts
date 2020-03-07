import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordsEquality } from 'src/app/utils/validators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordRepeated: ['', [Validators.required]]
      }, { validators: passwordsEquality })
    });
  }


  registerFormSubmit() {
    if (this.registerForm.valid) {
      this.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.passwords.password)
      .then(r => {
        console.log(r);
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  registerBtnClick() {
    this.registerFormSubmit();
  }

  onPasswordInput() {
    if (this.registerForm.get('passwords').hasError('passwordsEquality'))
      this.registerForm.get('passwords.passwordRepeated').setErrors({'passwordsEquality': true});
    else
      this.registerForm.get('passwords.passwordRepeated').setErrors(null);
  }

}
