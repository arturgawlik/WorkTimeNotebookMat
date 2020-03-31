import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FetchingService } from 'src/app/services/fetching/fetching.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuthMock } from 'src/app/testing/angular-fire-auth.mock';
import { of, throwError } from 'rxjs';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  let angularFireAuthMock;
  let routerSpy;
  let fetchingServiceSpy;
  let matSnakBarSpy;

  beforeEach(async(() => {

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    fetchingServiceSpy = jasmine.createSpyObj('FetchingService', ['show', 'hide']);
    matSnakBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: AngularFireAuth, useClass: AngularFireAuthMock},
        { provide: Router, useValue: routerSpy },
        { provide: FetchingService, useValue: fetchingServiceSpy },
        { provide: MatSnackBar, useValue: matSnakBarSpy }
      ]
    })
    .compileComponents();

    angularFireAuthMock = TestBed.inject(AngularFireAuth);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have logo element', () => {
    const elem = fixture.debugElement.query(By.css('.logo'));
    expect(elem.nativeElement.textContent).toBe('WTM');
  });

  it('should not have container with proper elements if its not anthorized', () => {
    spyOnProperty(angularFireAuthMock, 'user', 'get').and.returnValue(of(null));
    fixture.detectChanges();
    
    const elem = fixture.debugElement.query(By.css('#auth-con'));
    expect(elem).toBeFalsy();
  });

  it('should have container with proper elements if its anthorized', () => {
    const authConElem = fixture.debugElement.query(By.css('#auth-con'));
    expect(authConElem).toBeTruthy();
    
    const logoutBtnElem = authConElem.query(By.css('a'));
    expect(logoutBtnElem).toBeTruthy();
  });

  it('should call TopbarComponent.logout when click logout btn', () => {
    spyOn(component, 'logout'); 
    const logoutBtn = fixture.debugElement.query(By.css('#auth-con a'));
    logoutBtn.triggerEventHandler('click', null);

    expect(component.logout).toHaveBeenCalled();
  });

  it('should TopbarComponent.logout call AngularFireAuth.signOut', () => {
    spyOn(angularFireAuthMock, 'signOut').and.returnValue(of(null).toPromise());
    component.logout();
    expect(angularFireAuthMock.signOut).toHaveBeenCalled();
  });

  it('should call FetchingService.show and then FetchingService.hide when TopbarComponent.logout is call when AngularFireAuth.auth resolve', fakeAsync(() => {
    component.logout();
    expect(fetchingServiceSpy.show).toHaveBeenCalled();
    tick();
    expect(fetchingServiceSpy.hide).toHaveBeenCalled();
  }));

  it('should call FetchingService.show and then FetchingService.hide when TopbarComponent.logout is call when AngularFireAuth.auth reject', fakeAsync(() => {
    spyOn(angularFireAuthMock, 'signOut').and.returnValue(throwError(null).toPromise());
    component.logout();
    expect(fetchingServiceSpy.show).toHaveBeenCalled();
    tick();
    expect(fetchingServiceSpy.hide).toHaveBeenCalled();
  }));

  it('should call navigate to "/login" when AngularFireAuth.signOut resolve', fakeAsync(() => {
    component.logout();
    tick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should open snackBar when AngularFireAuth.signOut reject', fakeAsync(() => {
    spyOn(angularFireAuthMock, 'signOut').and.returnValue(throwError(null).toPromise());
    component.logout();
    tick();
    expect(matSnakBarSpy.open).toHaveBeenCalledWith('Something goes wrong... :(');
  }));

});
