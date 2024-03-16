import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceControlsComponent } from './race-controls.component';

describe('RaceControlsComponent', () => {
  let component: RaceControlsComponent;
  let fixture: ComponentFixture<RaceControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaceControlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaceControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
