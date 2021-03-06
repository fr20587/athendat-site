// Angular Modules
import { Routes } from '@angular/router';

// Components
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { TermsComponent } from './terms/terms.component';

// Resolvers
import { ContactResolver } from './contact/contact.resolver';
import { HomeResolver } from './home/home.resolver';
import { PrivacyResolver } from './privacy/privacy.resolver';
import { ProductResolver } from './products/products.resolver';
import { TermsResolver } from './terms/terms.resolver';
import { PaymentCompleteComponent } from './products/payment-complete/payment-complete.component';

/**
 * Pages Routes
 */
export const PAGES_ROUTES: Routes = [

    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
                data: {animation: 'HomePage'},
                resolve: {
                    data: HomeResolver
                }
            },
            {
                path: 'about',
                component: AboutComponent,
                data: {animation: 'AboutPage'}
            },
            {
                path: 'contact',
                component: ContactComponent,
                data: {animation: 'ContactPage'},
                resolve: {
                    messageCategory: ContactResolver
                }
            },
            {
                path: 'faqs',
                component: FaqsComponent
            },
            {
                path: 'terms',
                component: TermsComponent,
                resolve: {
                    terms: TermsResolver
                }
            },
            {
                path: 'privacy',
                component: PrivacyComponent,
                resolve: {
                    privacy: PrivacyResolver
                }
            },
            // {
            //     path: 'products',
            //     redirectTo: '/home#products'
            // },
            {
                path: 'products/:productId',
                component: ProductDetailComponent,
                resolve: {
                    product: ProductResolver
                }
            },
            {
                path: 'complete-payment/:productId',
                component: PaymentCompleteComponent
            },
        ]
    }

];


