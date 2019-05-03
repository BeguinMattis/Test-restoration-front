import { TestBed } from '@angular/core/testing';
import { OpinionService } from './opinion.service';

describe('OpinionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('constructor', () => {
    it('Should create the service', () => {
      const service: OpinionService = TestBed.get(OpinionService);
      expect(service).toBeTruthy();
    });
  });
});
