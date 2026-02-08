import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgetUserPage } from './forget-user.page';

describe('ForgetUserPage', () => {
  let component: ForgetUserPage;
  let fixture: ComponentFixture<ForgetUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
