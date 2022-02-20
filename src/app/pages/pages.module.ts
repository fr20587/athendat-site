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
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { PaymentDialogComponent } from './products/product-detail/payment-dialog/payment-dialog.component';
import { PaymentCompleteComponent } from './products/payment-complete/payment-complete.component';


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
        ProductDetailComponent,
        PaymentDialogComponent,
        PaymentCompleteComponent,
    ],
    imports: [
        LayoutModule,
        RouterModule.forChild(PAGES_ROUTES),
        SharedModule
    ]
})
export class PagesModule { }
