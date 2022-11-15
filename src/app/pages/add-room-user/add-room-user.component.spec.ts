import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomUserComponent } from './add-room-user.component';

describe('AddRoomUserComponent', () => {
  let component: AddRoomUserComponent;
  let fixture: ComponentFixture<AddRoomUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoomUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoomUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
