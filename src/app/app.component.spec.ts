import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
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

  it('should hide progress loader after ngAfterViewInit call + 500ms', () => {
    const fixture = TestBed.createComponent(AppComponent);
  });

});
