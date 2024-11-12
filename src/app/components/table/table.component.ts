import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { APIResponseModel, Author } from '../../model/interface/authors';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [HttpClientModule, RouterModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  readonly http = inject(HttpClient)
  readonly dialog = inject(MatDialog);
  authorsList: Author[] = []

  ngOnInit(): void {
    this.getAllAuthors()
  }

  getAllAuthors(): void {
    this.http.get<APIResponseModel>("author_table_display").subscribe((res: APIResponseModel) => {
      this.authorsList = res.Data
    })
  }

  deleteAuthor(id: string): void {
    this.http.delete(`author/delete/${id}`).subscribe({
      next: () => {
        this.getAllAuthors()
      },
      error: err => console.error(`Error trying to delete author ${id}`, err)
    });
  }

  openDeleteDialog(id: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: id
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteAuthor(id);
      }
    })
  }
}
