import { Routes } from '@angular/router';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { CreateAuthorComponent } from './components/create-author/create-author.component';
import { AuthorTableComponent } from './components/author-table/author-table.component';
import { TitleTableComponent } from './components/title-table/title-table.component';
import { TitleDetailsComponent } from './components/title-details/title-details.component';
import { CreateTitleComponent } from './components/create-title/create-title.component';

export const routes: Routes = [
    {
        path: 'author',
        children: [
            { path: '', component: AuthorTableComponent },
            { path: 'create-author', component: CreateAuthorComponent },
            { path: ':id', component: AuthorDetailsComponent }
        ]
    },
    {
        path: 'title',
        children: [
            { path: '', component: TitleTableComponent },
            { path: 'create-title', component: CreateTitleComponent },
            { path: ':id', component: TitleDetailsComponent }
        ]
    }
];

