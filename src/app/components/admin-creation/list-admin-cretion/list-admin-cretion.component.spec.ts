import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdminCretionComponent } from './list-admin-cretion.component';

describe('ListAdminCretionComponent', () => {
  let component: ListAdminCretionComponent;
  let fixture: ComponentFixture<ListAdminCretionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAdminCretionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdminCretionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
