// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import localeEs from '@angular/common/locales/es-CU';

// Third's Modules
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';

// App Component
import { AppComponent } from './app.component';

// Modules
import { SharedModule } from './shared/shared.module';

// Interceptor
import { HttpInterceptorService } from './@ath/interceptors/http-interceptor.service';

// Routes
import { APP_ROUTES } from './app.routing';

/**
 * Router Config
 */
const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    anchorScrolling: "enabled",
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
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(APP_ROUTES, routerConfig),
        NgxBootstrapIconsModule.pick(allIcons),
        SharedModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es-CU' },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
