import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOpinionsComponent } from './list-opinions.component';

describe('ListOpinionsComponent', () => {
  let component: ListOpinionsComponent;
  let fixture: ComponentFixture<ListOpinionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOpinionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOpinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
