import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorTableComponent } from './author-table.component';

describe('TableComponent', () => {
  let component: AuthorTableComponent;
  let fixture: ComponentFixture<AuthorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
