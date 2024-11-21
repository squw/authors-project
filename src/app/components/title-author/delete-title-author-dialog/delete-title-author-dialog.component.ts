import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { TitleAuthor } from '../../../model/interface/titles';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-title-author-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    CommonModule
  ],
  templateUrl: './delete-title-author-dialog.component.html',
  styleUrl: './delete-title-author-dialog.component.css'
})
export class DeleteTitleAuthorDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<DeleteTitleAuthorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public title_author: TitleAuthor
  ) {}
}
