// Angular Modules
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Animations
import { pagesAnimation } from './pages.animations';

@Component({
    selector: 'ath-pages',
    templateUrl: './pages.component.html',
    animations: [pagesAnimation],
})
export class PagesComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    getAnimations(outlet: RouterOutlet): any {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }

}
