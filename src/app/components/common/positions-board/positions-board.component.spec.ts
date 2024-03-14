import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsBoardComponent } from './positions-board.component';

describe('PositionsBoardComponent', () => {
  let component: PositionsBoardComponent;
  let fixture: ComponentFixture<PositionsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionsBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PositionsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
