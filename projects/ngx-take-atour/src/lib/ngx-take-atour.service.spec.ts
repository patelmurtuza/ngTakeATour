import { TestBed } from '@angular/core/testing';

import { NgxTakeATourService } from './ngx-take-atour.service';

describe('NgxTakeATourService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxTakeATourService = TestBed.get(NgxTakeATourService);
    expect(service).toBeTruthy();
  });
});
