import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOpinionComponent } from './add-opinion.component';

xdescribe('AddOpinionComponent', () => {
  let component: AddOpinionComponent;
  let fixture: ComponentFixture<AddOpinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOpinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('Should create the component', () => {
      expect(component).toBeTruthy();
    });
  });
});
