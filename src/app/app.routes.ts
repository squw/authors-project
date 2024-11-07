import { Routes } from '@angular/router';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { CreateAuthorComponent } from './components/create-author/create-author.component';

export const routes: Routes = [
    { path: 'create-author', component: CreateAuthorComponent },
    { path: ':id', component: AuthorDetailsComponent }
    
];
