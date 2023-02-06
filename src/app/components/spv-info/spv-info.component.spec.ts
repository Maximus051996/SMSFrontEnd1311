import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpvInfoComponent } from './spv-info.component';

describe('SpvInfoComponent', () => {
  let component: SpvInfoComponent;
  let fixture: ComponentFixture<SpvInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpvInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpvInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
