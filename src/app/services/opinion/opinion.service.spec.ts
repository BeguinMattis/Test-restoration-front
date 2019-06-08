import { TestBed, inject } from '@angular/core/testing';
import { OpinionService } from './opinion.service';
import { BackService } from '../back/back.service';
import { environment } from '../../../environments/environment';

describe('OpinionService', () => {
  const backServiceMock: jasmine.SpyObj<BackService> = jasmine.createSpyObj('BackService', ['get', 'post']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: BackService,
        useValue: backServiceMock
      }
    ]
  }));

  describe('constructor', () => {
    it('Should create the service', inject([OpinionService], (opinionService: OpinionService) => {
      expect(opinionService).toBeTruthy();
    }));
  });

  describe('getOpinions', () => {
    it('Should call the get method of the BackService with the opinion_list endpoint',
      inject([OpinionService], (opinionService: OpinionService) => {
        opinionService.getOpinions();
        expect(backServiceMock.get).toHaveBeenCalledWith(environment.test_restoration.opinion_list);
      })
    );
  });

  describe('addOpinion', () => {
    it('Should call the post method of the BackService with the opinion_add endpoint and the opinion body',
      inject([OpinionService], (opinionService: OpinionService) => {
        const opinion: any = {};
        opinionService.addOpinion(opinion);
        expect(backServiceMock.post).toHaveBeenCalledWith(environment.test_restoration.opinion_add, opinion);
      })
    );
  })
});
