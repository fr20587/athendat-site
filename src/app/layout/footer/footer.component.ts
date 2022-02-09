// Angular Modules
import { Component } from '@angular/core';

// Third properties
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { pagesAnimation } from 'src/app/pages/pages.animations';

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
    // animations: [pagesAnimation],
})
export class FooterComponent {

    // Public Properties
    public currentYear: number = new Date().getFullYear();
    public iconNames = IconNamesEnum;
}
