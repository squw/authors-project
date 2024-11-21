import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTitleAuthorDialogComponent } from './delete-title-author-dialog.component';

describe('DeleteTitleAuthorDialogComponent', () => {
  let component: DeleteTitleAuthorDialogComponent;
  let fixture: ComponentFixture<DeleteTitleAuthorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTitleAuthorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTitleAuthorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
