import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SAdmComponent } from './s-adm.component';

describe('SAdmComponent', () => {
  let component: SAdmComponent;
  let fixture: ComponentFixture<SAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
