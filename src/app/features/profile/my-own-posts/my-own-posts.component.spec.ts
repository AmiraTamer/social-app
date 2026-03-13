import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOwnPostsComponent } from './my-own-posts.component';

describe('MyOwnPostsComponent', () => {
  let component: MyOwnPostsComponent;
  let fixture: ComponentFixture<MyOwnPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOwnPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOwnPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
