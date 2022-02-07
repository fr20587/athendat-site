// Angular Modules
import { Component } from '@angular/core';

/**
 * Footer Component
 *
 * @export
 * @class FooterComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'ath-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent {

    // Public Properties
    public currentYear: number = new Date().getFullYear();

}
