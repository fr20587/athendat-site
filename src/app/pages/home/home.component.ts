// Angular Modules
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

// Third properties
import { Subject, takeUntil } from 'rxjs';
import { IconNamesEnum } from 'ngx-bootstrap-icons';

// Service
import { HomeService } from './home.service';

// Animations
import { athAnimations } from './../../@ath/animations';

// Types
import { Member, Product } from './home.types';

/**
 * Home Component
 *
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    selector: 'ath-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: athAnimations
})
export class HomeComponent implements OnInit, OnDestroy {

    // Public properties
    public iconNames = IconNamesEnum;
    public products: Product[] = [];
    public team: Member[] = [];

    // Private properties
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _homeService: HomeService,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Get Products
        this._homeService.products$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((products) => {

                // Store the products
                this.products = products;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get team
        this._homeService.team$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((team) => {

                // Store the team
                this.team = team;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

}
