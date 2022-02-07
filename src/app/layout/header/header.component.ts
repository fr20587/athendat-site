// Angular Modules
import { Component, HostListener, OnInit } from '@angular/core';


/** */
@Component({
    selector: 'ath-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

    // Public properties
    public screenWidth!: number;

    constructor() { }

    ngOnInit(): void {
        this.screenWidth = window.innerWidth;
    }

    /**
     * Watch screen width
     *
     * @memberof HeaderComponent
     */
    @HostListener('window:resize', ['$event'])
    public onWindowResize() {
        this.screenWidth = window.innerWidth;
    }

}
