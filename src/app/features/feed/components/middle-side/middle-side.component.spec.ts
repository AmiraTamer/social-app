import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleSideComponent } from './middle-side.component';

describe('MiddleSideComponent', () => {
  let component: MiddleSideComponent;
  let fixture: ComponentFixture<MiddleSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiddleSideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiddleSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
