import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnstufenComponent } from './warnstufen.component';

describe('WarnstufenComponent', () => {
  let component: WarnstufenComponent;
  let fixture: ComponentFixture<WarnstufenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarnstufenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarnstufenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
