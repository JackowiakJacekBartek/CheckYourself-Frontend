import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferAppliesComponent } from './job-offer-applies.component';

describe('JobOfferAppliesComponent', () => {
  let component: JobOfferAppliesComponent;
  let fixture: ComponentFixture<JobOfferAppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferAppliesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOfferAppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
