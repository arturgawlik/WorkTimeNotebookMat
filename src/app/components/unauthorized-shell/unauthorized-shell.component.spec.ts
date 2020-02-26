import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedShellComponent } from './unauthorized-shell.component';

describe('UnauthorizedShellComponent', () => {
  let component: UnauthorizedShellComponent;
  let fixture: ComponentFixture<UnauthorizedShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthorizedShellComponent ]
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
});
