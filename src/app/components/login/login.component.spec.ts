import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchingService } from 'src/app/services/fetching/fetching.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let angularFireSpy;
    let routerSpy;
    let matSnakBarSpy;
    let fetchingServiceSpy;

    beforeEach(async(() => {

        angularFireSpy = jasmine.createSpyObj('AngularFireAuth', ['signInWithEmailAndPassword']);
        angularFireSpy.signInWithEmailAndPassword.and.returnValue(of('test').toPromise());
        routerSpy = jasmine.createSpyObj('Router', ['navigate'], {
            routerState: {
                root: null
            }
        });
        matSnakBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
        fetchingServiceSpy = jasmine.createSpyObj('FetchingService', ['show', 'hide']);

        TestBed.configureTestingModule({
            imports: [AppModule],
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
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('component.loginForm initialy should be undefined', () => {
        expect(component.loginForm).toBeUndefined('component.loginForm initialy should be undefined');
    });

    it('initForm initialize loginForm variable', () => {
        component.initForm();
        expect(component.loginForm).toBeTruthy('after component.initForm call component.loginForm should have value');
    });

    it('should initialize loginForm after component full init', () => {
        fixture.detectChanges();
        expect(component.loginForm).toBeTruthy('after full component init component.loginForm should have value');
    });

    it('component.loginForm should have "email" and "password" FormControl elements', () => {
        fixture.detectChanges();

        expect(component.loginForm.get('email')).toBeTruthy('component.loginForm should have email');
        expect(component.loginForm.get('password')).toBeTruthy('component.loginForm should have password');
    });

    it('should have app-nav-topbar', () => {
        fixture.detectChanges();
        const elem = fixture.debugElement.query(By.css('app-nav-topbar'));
        expect(elem).toBeTruthy();
    });

    it('should have app-footer', () => {
        fixture.detectChanges();
        const elem = fixture.debugElement.query(By.css('app-footer'));
        expect(elem).toBeTruthy();
    });

    it('should have all form elements', () => {
        const emialInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
        expect(emialInput).toBeTruthy('view should have email input');
        const passInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));
        expect(passInput).toBeTruthy('view should have password input');
        const loginBtn = fixture.debugElement.query(By.css('#sign-in-btn'));
        expect(loginBtn).toBeTruthy('view should have login button');
        const registerBtn = fixture.debugElement.query(By.css('#register-new-account-btn'));
        expect(registerBtn).toBeTruthy('view should have login button');
    });

    it('initialy errors should not be visible', () => {
        fixture.detectChanges();
        const elem = fixture.debugElement.query(By.css('mat-error'));
        expect(elem).toBeFalsy();
    });

    it('should show errors when login btn was clicked without pass email and password', () => {
        fixture.detectChanges();
        const btn = fixture.debugElement.query(By.css('#sign-in-btn'));
        btn.triggerEventHandler('click', null);
        fixture.detectChanges();
        const elem = fixture.debugElement.queryAll(By.css('mat-error'));
        expect(elem).toBeTruthy();
        expect(elem[0].nativeElement.textContent).toBe('Field email is required!');
        expect(elem[1].nativeElement.textContent).toBe('Field password is required!');
    });

    it('should show password required communicat', () => {
        fixture.detectChanges();
        const input = fixture.debugElement.query(By.css('input[formControlName="email"]'));
        input.nativeElement.value = 'test@test.test';
        input.triggerEventHandler('input', { target: { value: 'test@test.test' } });
        const btn = fixture.debugElement.query(By.css('#sign-in-btn'));
        btn.triggerEventHandler('click', null);
        fixture.detectChanges();
        const errorCommunicat = fixture.debugElement.query(By.css('mat-error'));
        expect(errorCommunicat.nativeElement.textContent).toBe('Field password is required!');
    });

    it('should show email required communicat', () => {
        fixture.detectChanges();
        const input = fixture.debugElement.query(By.css('input[formControlName="password"]'));
        input.nativeElement.value = 'testtesttest';
        input.triggerEventHandler('input', { target: { value: 'testtesttest' } });
        const btn = fixture.debugElement.query(By.css('#sign-in-btn'));
        btn.triggerEventHandler('click', null);
        fixture.detectChanges();
        const errorCommunicat = fixture.debugElement.query(By.css('mat-error'));
        expect(errorCommunicat.nativeElement.textContent).toBe('Field email is required!');
    });

    it('should not show required messages when all inputs are filled', () => {
        fixture.detectChanges();
        const input1 = fixture.debugElement.query(By.css('input[formControlName="email"]'));
        const input2 = fixture.debugElement.query(By.css('input[formControlName="password"]'));
        input1.nativeElement.value = 'test@test.test';
        input2.nativeElement.value = 'testtesttest';
        input1.triggerEventHandler('input', { target: { value: 'test@test.test' } });
        input2.triggerEventHandler('input', { target: { value: 'testtesttest' } });
        const submitBtn = fixture.debugElement.query(By.css('#sign-in-btn'));
        submitBtn.triggerEventHandler('click', null);
        fixture.detectChanges();
        const errorCommunicat = fixture.debugElement.query(By.css('mat-error'));
        expect(errorCommunicat).toBeFalsy();
    });

    it('should try navigate to authorized when auth successed resolved', fakeAsync(() => {
        fixture.detectChanges();
        component.loginForm.get('email').setValue('test@test.test');
        component.loginForm.get('password').setValue('testtesttest');
        component.loginFormSubmit();
        tick();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    }));

    it('should dont try navigate to authorized when auth rejected', fakeAsync(() => {
        angularFireSpy.signInWithEmailAndPassword.and.returnValue(throwError('test reject').toPromise());
        fixture.detectChanges();
        component.loginForm.get('email').setValue('test@test.test');
        component.loginForm.get('password').setValue('testtesttest');
        component.loginFormSubmit();
        tick();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    }));

    it('should call MatSnackBar.open with message "Wrong email or password!" when auth rejected', fakeAsync(() => {
        angularFireSpy.signInWithEmailAndPassword.and.returnValue(throwError('test reject').toPromise());
        fixture.detectChanges();
        component.loginForm.get('email').setValue('test@test.test');
        component.loginForm.get('password').setValue('testtesttest');
        component.loginFormSubmit();
        tick();
        expect(matSnakBarSpy.open).toHaveBeenCalled();
    }));

    it('should call FetchingService.show and then FetchingService.hide when auth resolveed', fakeAsync(() => {
        fixture.detectChanges();
        component.loginForm.get('email').setValue('test@test.test');
        component.loginForm.get('password').setValue('testtesttest');
        component.loginFormSubmit();
        expect(fetchingServiceSpy.show).toHaveBeenCalled();
        tick();
        expect(fetchingServiceSpy.hide).toHaveBeenCalled();
    }));

    it('should call FetchingService.show and then FetchingService.hide when auth rejected', fakeAsync(() => {
        angularFireSpy.signInWithEmailAndPassword.and.returnValue(throwError('test reject').toPromise());
        fixture.detectChanges();
        component.loginForm.get('email').setValue('test@test.test');
        component.loginForm.get('password').setValue('testtesttest');
        component.loginFormSubmit();
        expect(fetchingServiceSpy.show).toHaveBeenCalled();
        tick();
        expect(fetchingServiceSpy.hide).toHaveBeenCalled();
    }));

    it('should has register new account btn', () => {
        fixture.detectChanges();
        const btn = fixture.debugElement.query(By.css('#register-new-account-btn'));
        expect(btn.attributes.routerLink).toBe('/register');
    });

});
