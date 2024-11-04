import { Routes } from '@angular/router';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';

export const routes: Routes = [
    { path: 'author/:id', component: AuthorDetailsComponent }
];
