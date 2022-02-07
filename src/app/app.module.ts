// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-CU';

// App Component
import { AppComponent } from './app.component';

// Routes
import { APP_ROUTES } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

/**
 * Router Config
 */
const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};

/**
* Register App Location
*
* @abstract Cuba location.
*/
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, routerConfig)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CU' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
