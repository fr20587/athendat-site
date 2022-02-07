// Angular Modules
import {  Routes } from '@angular/router';

/**
 * App Routes
 */
export const APP_ROUTES: Routes = [

  // Redirect empty path to '/home'
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  // Pages Modules
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },


];


