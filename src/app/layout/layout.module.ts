// Angular Modules
import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';

// Component
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]

})
export class LayoutModule { }
