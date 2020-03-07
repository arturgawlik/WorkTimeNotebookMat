import { AbstractControl } from '@angular/forms';


export function passwordsEquality(control: AbstractControl) {
    const password = control.get('password');
    const passwordRepeated = control.get('passwordRepeated');

    return password.value === passwordRepeated.value ? null : { passwordsEquality: true };
}
