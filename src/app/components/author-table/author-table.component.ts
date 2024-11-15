import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AuthorResponseModel, Author } from '../../model/interface/authors';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAuthorDialogComponent } from '../delete-author-dialog/delete-author-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [HttpClientModule, RouterModule, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule],
  templateUrl: './author-table.component.html',
  styleUrl: './author-table.component.css'
})
export class AuthorTableComponent implements OnInit {
  readonly http = inject(HttpClient)
  readonly dialog = inject(MatDialog);
  authorsList: Author[] = []

  ngOnInit(): void {
    this.getAllAuthors()
  }

  getAllAuthors(): void {
    this.http.get<AuthorResponseModel>("author/table-display").subscribe((res: AuthorResponseModel) => {
      this.authorsList = res.Data
    })
  }

  deleteAuthor(auth_info: Author): void {
    this.http.delete(`author/delete/${auth_info.au_id}`).subscribe({
      next: () => {
        this.getAllAuthors()
      },
      error: err => console.error(`Error trying to delete author ${auth_info.au_fname} ${auth_info.au_fname}`, err)
    });
  }

  openDeleteDialog(auth_info: Author, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteAuthorDialogComponent, {
      maxWidth: '80vw',
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      data: auth_info
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteAuthor(auth_info);
      }
    })
  }
}
