import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [AppModule]
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

  it('should have app-topbar', () => {
    fixture.detectChanges();
    const elem = fixture.debugElement.query(By.css('app-topbar'));
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
    input.triggerEventHandler('input', { target: { value: 'test@test.test' }});
    const btn = fixture.debugElement.query(By.css('#sign-in-btn'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();
    const errorCommunicat = fixture.debugElement.query(By.css('mat-error'));
    expect(errorCommunicat.nativeElement.textContent).toBe('Field password is required!');
  });

});
