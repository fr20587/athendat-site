// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Third's Modules
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';


@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxBootstrapIconsModule,
  ]
})
export class SharedModule { }
