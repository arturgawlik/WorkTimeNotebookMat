import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedShellComponent } from './authorized-shell.component';
import { By } from '@angular/platform-browser';

describe('AuthorizedShellComponent', () => {
  let component: AuthorizedShellComponent;
  let fixture: ComponentFixture<AuthorizedShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizedShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contains router-outler', () => {
    expect(fixture.debugElement.query(By.css('router-outlet'))).toBeTruthy();
  });
});
