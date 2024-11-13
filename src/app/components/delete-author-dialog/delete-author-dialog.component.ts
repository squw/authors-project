import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Author } from '../../model/interface/authors';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './delete-author-dialog.component.html',
  styleUrl: './delete-author-dialog.component.css'
})
export class DeleteAuthorDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAuthorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public author: Author) {}
}
