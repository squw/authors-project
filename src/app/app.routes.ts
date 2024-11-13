import { Routes } from '@angular/router';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { CreateAuthorComponent } from './components/create-author/create-author.component';
import { TableComponent } from './components/table/table.component';

export const routes: Routes = [
    { path: 'create-author', component: CreateAuthorComponent },
    { path: ':id', component: AuthorDetailsComponent },
    { path: '', component: TableComponent }
];
