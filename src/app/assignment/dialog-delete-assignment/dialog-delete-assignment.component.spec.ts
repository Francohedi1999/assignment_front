import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteAssignmentComponent } from './dialog-delete-assignment.component';

describe('DialogDeleteAssignmentComponent', () => {
  let component: DialogDeleteAssignmentComponent;
  let fixture: ComponentFixture<DialogDeleteAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteAssignmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDeleteAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
