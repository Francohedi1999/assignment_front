import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrDeleteUserComponent } from './update-or-delete-user.component';

describe('UpdateOrDeleteUserComponent', () => {
  let component: UpdateOrDeleteUserComponent;
  let fixture: ComponentFixture<UpdateOrDeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOrDeleteUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateOrDeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
