// Angular Modules
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

// Third properties
import { Subject, takeUntil } from 'rxjs';

// Service
import { TermsService } from './terms.service';

// Types
import { Terms } from './terms.types';

/**
 * Terms Component
 *
 * @export
 * @class TermsComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    selector: 'ath-terms',
    templateUrl: './terms.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsComponent implements OnInit, OnDestroy {

    // Public properties
    public terms!: Terms;

    // Private properties
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _termsService: TermsService,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Get terms
        this._termsService.terms$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((terms) => {

            // Store the terms
            this.terms = terms;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        })
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
