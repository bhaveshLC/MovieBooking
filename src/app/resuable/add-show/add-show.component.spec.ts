import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowComponent } from './add-show.component';

describe('AddShowComponent', () => {
  let component: AddShowComponent;
  let fixture: ComponentFixture<AddShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
