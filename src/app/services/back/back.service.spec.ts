import { TestBed } from '@angular/core/testing';
import { BackService } from './back.service';

xdescribe('BackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackService = TestBed.get(BackService);
    expect(service).toBeTruthy();
  });
});
