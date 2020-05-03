import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchingService } from 'src/app/services/fetching/fetching.service';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    let angularFireSpy;
    let routerSpy;
    let matSnakBarSpy;
    let fetchingServiceSpy;

    beforeEach(async(() => {

        angularFireSpy = jasmine.createSpyObj('AngularFireAuth', ['createUserWithEmailAndPassword']);
        angularFireSpy.createUserWithEmailAndPassword.and.returnValue(of('test').toPromise());
        routerSpy = jasmine.createSpyObj('Router', ['navigate'], {
            routerState: {
                root: null
            }
        });
        matSnakBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
        fetchingServiceSpy = jasmine.createSpyObj('FetchingService', ['show', 'hide']);

        TestBed.configureTestingModule({
            imports: [
                AppModule
            ],
            providers: [
                { provide: AngularFireAuth, useValue: angularFireSpy },
                { provide: Router, useValue: routerSpy },
                { provide: MatSnackBar, useValue: matSnakBarSpy },
                { provide: FetchingService, useValue: fetchingServiceSpy }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have app-nav-topbar element in template', () => {
        const appTopbarEl = fixture.debugElement.query(By.css('app-nav-topbar'));
        expect(appTopbarEl).toBeTruthy();
    });

    it('should have form with all inputs elements in template', () => {
        const formEl = fixture.debugElement.query(By.css('form'));
        expect(formEl).toBeTruthy('should have form elem');

        const emailEl = formEl.query(By.css('input[formControlName="email"]'));
        const pass1El = formEl.query(By.css('input[formControlName="password"]'));
        const pass2El = formEl.query(By.css('input[formControlName="passwordRepeated"]'));
        expect(emailEl).toBeTruthy('should have email input elem');
        expect(pass1El).toBeTruthy('should have password elem');
        expect(pass2El).toBeTruthy('should have repeat password elem');
    });

    it('should have submit and redirect to login btns', () => {
        const registerBtn = fixture.debugElement.query(By.css('#register-component-register-btn'));
        const goToLoginBtn = fixture.debugElement.query(By.css('#register-component-login-btn'));
        expect(registerBtn).toBeTruthy();
        expect(goToLoginBtn).toBeTruthy();
    });

    it('login btn should have routerLink to login path', () => {
        const goToLoginBtn = fixture.debugElement.query(By.css('#register-component-login-btn'));
        expect(goToLoginBtn.attributes.routerLink).toBe('/login');
    });

    it('should have app-footer element in template', () => {
        const appFooterEl = fixture.debugElement.query(By.css('app-footer'));
        expect(appFooterEl).toBeTruthy();
    });

    it('form is initialed after component initiation', () => {
        expect(component.registerForm).toBeTruthy();
    });

    it('form has email and passwords formControls', () => {
        const emailFC = component.registerForm.get('email');
        const passwordFC = component.registerForm.get('passwords.password');
        const passwordRepeatedFC = component.registerForm.get('passwords.passwordRepeated');

        expect(emailFC).toBeTruthy('should have email elem');
        expect(passwordFC).toBeTruthy('should have password elem');
        expect(passwordRepeatedFC).toBeTruthy('should have passwordRepeated elem');
    });

    it('RegisterComponent.registerForm should have value from inputs in template', () => {
        const emailValue = 'email@email.email';
        const password1Value = 'password1';
        const password2Value = 'password2';

        const emailEl = fixture.debugElement.query(By.css('input[formControlName="email"]'));
        const pass1El = fixture.debugElement.query(By.css('input[formControlName="password"]'));
        const pass2El = fixture.debugElement.query(By.css('input[formControlName="passwordRepeated"]'));

        emailEl.nativeElement.value = emailValue;
        pass1El.nativeElement.value = password1Value;
        pass2El.nativeElement.value = password2Value;

        emailEl.triggerEventHandler('input', { target: { value: emailValue } });
        pass1El.triggerEventHandler('input', { target: { value: password1Value } });
        pass2El.triggerEventHandler('input', { target: { value: password2Value } });

        expect(component.registerForm.get('email').value).toBe(emailValue);
        expect(component.registerForm.get('passwords.password').value).toBe(password1Value);
        expect(component.registerForm.get('passwords.passwordRepeated').value).toBe(password2Value);
    });

    it('Register new account btn should call RegisterComponent.registerBtnClick', () => {
        spyOn(component, 'registerFormSubmit');
        const btn = fixture.debugElement.query(By.css('#register-component-register-btn'));
        btn.triggerEventHandler('click', null);
        expect(component.registerFormSubmit).toHaveBeenCalled();
    });

    it('should show required messages when form is submit without fill fileds', () => {
        component.registerFormSubmit();
        fixture.detectChanges();
        const errors = fixture.debugElement.queryAll(By.css('mat-error'));
        expect(errors.find(x => x.nativeElement.textContent === 'Field email is required!')).toBeTruthy();
        expect(errors.find(x => x.nativeElement.textContent === 'Field password is required!')).toBeTruthy();
    });

    it('should show only emial required message', () => {
        component.registerForm.get('passwords.password').setValue('test test test');
        component.registerForm.get('passwords.passwordRepeated').setValue('test test test');
        component.registerFormSubmit();
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css('mat-error'));
        expect(error.nativeElement.textContent).toBe('Field email is required!');
    });

    it('should show only passwod required message', () => {
        component.registerForm.get('email').setValue('email@email.email');
        component.registerFormSubmit();
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css('mat-error'));
        expect(error.nativeElement.textContent).toBe('Field password is required!');
    });

    it('should show only repeat passwod equality with password message when repead password is not filled', () => {
        component.registerForm.get('email').setValue('email@email.email');
        component.registerForm.get('passwords.password').setValue('test test test');
        component.registerFormSubmit();
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css('mat-error'));
        expect(error.nativeElement.textContent).toBe("Password's must be equal!");
    });

    it('should show only repeat passwod equality with password message when repead password is filled but wrong', () => {
        component.registerForm.get('email').setValue('email@email.email');
        component.registerForm.get('passwords.password').setValue('test test test');
        component.registerForm.get('passwords.passwordRepeated').setValue('test test tes');
        component.registerFormSubmit();
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css('mat-error'));
        expect(error.nativeElement.textContent).toBe("Password's must be equal!");
    });

    it('should not show error when all fields are filled well', () => {
        component.registerForm.get('email').setValue('email@email.email');
        component.registerForm.get('passwords.password').setValue('test test test');
        component.registerForm.get('passwords.passwordRepeated').setValue('test test test');
        component.registerFormSubmit();
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css('mat-error'));
        expect(error).toBeFalsy();
    });

    it('should call FetchingService.show and then FetchingService.hide when submit valid form - with server resolve', fakeAsync(() => {
        component.registerForm.get('email').setValue('email@email.email');
        component.registerForm.get('passwords.password').setValue('test test test');
        component.registerForm.get('passwords.passwordRepeated').setValue('test test test');
        component.registerFormSubmit();
        expect(fetchingServiceSpy.show).toHaveBeenCalled();
        tick();
        expect(fetchingServiceSpy.hide).toHaveBeenCalled();
    }));

    it('should call FetchingService.show and then FetchingService.hide when submit valid form - with server reject', fakeAsync(() => {
        angularFireSpy.createUserWithEmailAndPassword.and.returnValue(throwError('test reject').toPromise());
        component.registerForm.get('email').setValue('email@email.email');
        component.registerForm.get('passwords.password').setValue('test test test');
        component.registerForm.get('passwords.passwordRepeated').setValue('test test test');
        component.registerFormSubmit();
        expect(fetchingServiceSpy.show).toHaveBeenCalled();
        tick();
        expect(fetchingServiceSpy.hide).toHaveBeenCalled();
    }));

    it('should navigate to authorized when submit resolve', fakeAsync(() => {
        component.registerForm.get('email').setValue('email@email.email');
        component.registerForm.get('passwords.password').setValue('test test test');
        component.registerForm.get('passwords.passwordRepeated').setValue('test test test');
        component.registerFormSubmit();
        tick();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    }));

    it('should show error message in snackBar when submit reject', fakeAsync(() => {
        angularFireSpy.createUserWithEmailAndPassword.and.returnValue(throwError('test reject').toPromise());
        component.registerForm.get('email').setValue('email@email.email');
        component.registerForm.get('passwords.password').setValue('test test test');
        component.registerForm.get('passwords.passwordRepeated').setValue('test test test');
        component.registerFormSubmit();
        tick();
        expect(matSnakBarSpy.open).toHaveBeenCalledWith('Something goes wrong... :(');
    }));
});
