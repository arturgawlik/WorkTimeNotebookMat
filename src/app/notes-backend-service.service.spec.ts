import { TestBed } from '@angular/core/testing';

import { NotesBackendServiceService } from './notes-backend-service.service';

describe('NotesBackendServiceService', () => {
  let service: NotesBackendServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesBackendServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
