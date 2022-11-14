import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInstructionsComponent } from './pre-instructions.component';

describe('PreInstructionsComponent', () => {
  let component: PreInstructionsComponent;
  let fixture: ComponentFixture<PreInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreInstructionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
