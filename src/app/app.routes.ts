import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then( m => m.MainPage)
  },
  {
    path: 'listing',
    loadComponent: () => import('./listing/listing.page').then( m => m.ListingPage)
  },
  {
    path: 'update',
    loadComponent: () => import('./update/update.page').then( m => m.UpdatePage)
  },
];
