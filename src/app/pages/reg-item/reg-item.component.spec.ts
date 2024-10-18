import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegItemComponent } from './reg-item.component';

describe('RegItemComponent', () => {
  let component: RegItemComponent;
  let fixture: ComponentFixture<RegItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
