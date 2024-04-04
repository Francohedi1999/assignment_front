import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDialogNewUserComponent } from './error-dialog-new-user.component';

describe('ErrorDialogNewUserComponent', () => {
  let component: ErrorDialogNewUserComponent;
  let fixture: ComponentFixture<ErrorDialogNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorDialogNewUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorDialogNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
