import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RaceResult } from './race-result.component';


describe('RaceResult', () => {
  let component: RaceResult;
  let fixture: ComponentFixture<RaceResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaceResult]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaceResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
