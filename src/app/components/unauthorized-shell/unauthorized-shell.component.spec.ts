import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedShellComponent } from './unauthorized-shell.component';
import { AppModule } from 'src/app/app.module';

describe('UnauthorizedShellComponent', () => {
  let component: UnauthorizedShellComponent;
  let fixture: ComponentFixture<UnauthorizedShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizedShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have router-outlet', () => {
    expect(fixture.nativeElement.querySelector('router-outlet')).toBeTruthy();
  });

});
