import { TestBed } from '@angular/core/testing';

import { NotesBackendService } from './notes-backend-service.service';

describe('NotesBackendServiceService', () => {
  let service: NotesBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
