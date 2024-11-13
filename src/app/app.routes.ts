import { Routes } from '@angular/router';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { CreateAuthorComponent } from './components/create-author/create-author.component';
import { AuthorTableComponent } from './components/author-table/author-table.component';

export const routes: Routes = [
    {
        path: 'author',
        children: [
            { path: '', component: AuthorTableComponent },
            { path: ':id', component: AuthorDetailsComponent },
            { path: 'create-author', component: CreateAuthorComponent }
        ]
    }
];

