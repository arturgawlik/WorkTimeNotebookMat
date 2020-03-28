import { AbstractControl } from '@angular/forms';


export function passwordsEquality(control: AbstractControl) {
    const password = control.get('password');
    const passwordRepeated = control.get('passwordRepeated');
    const err = password.value === passwordRepeated.value ? null : { passwordsEquality: true };
    passwordRepeated.setErrors(err);
}
