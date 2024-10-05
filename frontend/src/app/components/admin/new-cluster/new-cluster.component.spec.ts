import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClusterComponent } from './new-cluster.component';

describe('NewClusterComponent', () => {
  let component: NewClusterComponent;
  let fixture: ComponentFixture<NewClusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClusterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
