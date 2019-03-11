import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRestorationComponent } from './search-restoration.component';

describe('LocateUserComponent', () => {
  let component: SearchRestorationComponent;
  let fixture: ComponentFixture<SearchRestorationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRestorationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRestorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
