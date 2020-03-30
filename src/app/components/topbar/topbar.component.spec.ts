import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FetchingService } from 'src/app/services/fetching/fetching.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuthMock } from 'src/app/testing/angular-fire-auth.mock';
import { of } from 'rxjs';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  let angularFireMock;
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

    angularFireMock = TestBed.inject(AngularFireAuth);
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
    spyOnProperty(angularFireMock, 'user', 'get').and.returnValue(of(null));
    fixture.detectChanges(); // TODO: check why there is need to call detectChanges function
    
    const elem = fixture.debugElement.query(By.css('#auth-con'));
    expect(elem).toBeFalsy();
  });

  it('should have container with proper elements if its anthorized', () => {
    spyOnProperty(angularFireMock, 'user', 'get').and.returnValue(of({ username: 'test' }));
    
    const authConElem = fixture.debugElement.query(By.css('#auth-con'));
    expect(authConElem).toBeTruthy();
    
    const logoutBtnElem = authConElem.query(By.css('a'));
    expect(logoutBtnElem).toBeTruthy();


  });

});
