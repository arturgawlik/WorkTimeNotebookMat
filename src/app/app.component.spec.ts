import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { of } from 'rxjs';
import { FetchingService } from './services/fetching.service';

describe('AppComponent', () => {

  beforeEach(async(() => {

    // // const fetchingServiceSpy = jasmine.createSpyObj('FetchingService', [], ['isLoading']);
    // const fetchingServiceSpy = jasmine.createSpyObj('FetchingService', ['hide'], { 
    //   isLoading: of(false)
    // });
    // // isLoadingSpy = fetchingServiceSpy.isLoading.and.returnValue(of(false));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        FetchingService 
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have isFetching flag initialy  as true', () => {
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
    
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // initialy progress bar should be visible
    let matProcessBar = fixture.nativeElement.querySelector('mat-progress-bar');
    expect(matProcessBar).toBeTruthy();
    
    // then ngAfterViewInit call to hide progress bar
    tick(500);
    
    fixture.detectChanges();

    // after that progress bar should disappear
    matProcessBar = fixture.nativeElement.querySelector('mat-progress-bar');
    expect(matProcessBar).toBeFalsy();
  }));

  it('should show progress-bar when isFetching flag is set as true and hide when isFetching flag is set as false', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-progress-bar')).toBeFalsy(' after full load progress-bar should not be visible');

    fixture.componentInstance.isFetching = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-progress-bar')).toBeTruthy('after set AppComponent.isFetching as true progress-bar should be visible');

    fixture.componentInstance.isFetching = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-progress-bar')).toBeFalsy('after set AppComponent.isFetching as false progress-bar should not be visible');

  }));

  it('should chnage AppComponent.isFetching flag as false after FetchingService.isLoading pushes false', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    tick(500);
    fixture.componentInstance.isFetching = true;

    const fetchingService = TestBed.get(FetchingService);
    fetchingService.hide();
    tick(500);

    // AppComponent.isFetching should be false after FetchingService.hide() was called
    expect(fixture.componentInstance.isFetching).toBeFalse();
  }));

  it('should chnage AppComponent.isFetching flag as true after FetchingService.isLoading pushes true', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    tick(500);

    const fetchingService = TestBed.get(FetchingService);
    fetchingService.show();
    
    // AppComponent.isFetching should be true after FetchingService.show() was called
    expect(fixture.componentInstance.isFetching).toBeTrue();
  }));

});
