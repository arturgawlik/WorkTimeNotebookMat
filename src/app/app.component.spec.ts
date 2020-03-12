import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { of } from 'rxjs';
import { FetchingService } from './services/fetching.service';

describe('AppComponent', () => {

  let isLoadingSpy;

  beforeEach(async(() => {

    const fetchingServiceSpy = jasmine.createSpyObj('FetchingService', [], ['isLoading']);
    isLoadingSpy = fetchingServiceSpy.isLoading.and.returnValue(of(false));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: FetchingService, useValue: fetchingServiceSpy }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('WorkTimeNotebookMat app is running!');
  });

  it('should have isFetching flag as true', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.isFetching).toBeTrue();
  });

  it('should show progress loader in begin of component life', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const matProcessBar = fixture.nativeElement.querySelector('mat-progress-bar');
    expect(matProcessBar).toBeTruthy();
  });

  it('should hide progress loader after ngAfterViewInit call + 500ms', fakeAsync(() => {
    
    const q$ = cold('x|', {x: false});
    isLoadingSpy.and.returnValue(q$);
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    // initialy progress bar should be visible
    let matProcessBar = fixture.nativeElement.querySelector('mat-progress-bar');
    expect(matProcessBar).toBeTruthy();
    
    // then ngAfterViewInit call to hide progress bar
    getTestScheduler().flush();
    // after it there is setTimeout(..., 500);
    tick(500);

    fixture.detectChanges();

    // after that progress bar should disappear
    matProcessBar = fixture.nativeElement.querySelector('mat-progress-bar');
    expect(matProcessBar).toBeFalsy();
  }));

});
