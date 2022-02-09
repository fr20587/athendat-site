// Angular Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Modules
import { LayoutModule } from './../layout/layout.module';
import { SharedModule } from './../shared/shared.module';

// Components
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProductsComponent } from './products/products.component';
import { TermsComponent } from './terms/terms.component';

// Routes
import { PAGES_ROUTES } from './pages.routing';


@NgModule({
    declarations: [
        HomeComponent,
        PagesComponent,
        ContactComponent,
        AboutComponent,
        FaqsComponent,
        TermsComponent,
        ProductsComponent,
        PrivacyComponent,
    ],
    imports: [
        LayoutModule,
        RouterModule.forChild(PAGES_ROUTES),
        SharedModule
    ]
})
export class PagesModule { }
