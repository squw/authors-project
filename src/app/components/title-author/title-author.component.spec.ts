import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleAuthorComponent } from './title-author.component';

describe('TitleAuthorComponent', () => {
  let component: TitleAuthorComponent;
  let fixture: ComponentFixture<TitleAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleAuthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
