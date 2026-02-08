import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguratePage } from './configurate.page';

describe('ConfiguratePage', () => {
  let component: ConfiguratePage;
  let fixture: ComponentFixture<ConfiguratePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
