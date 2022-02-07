// Angular Modules
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

// Third properties
import { Subject, takeUntil } from 'rxjs';

// Service
import { PrivacyService } from './privacy.service';

// Types
import { Privacy } from './privacy.types';

/**
 * Privacy Component
 *
 * @export
 * @class PrivacyComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    selector: 'ath-privacy',
    templateUrl: './privacy.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyComponent implements OnInit, OnDestroy {

    // Public properties
    public privacy!: Privacy;

    // Private properties
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _privacyService: PrivacyService,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Get Privacy
        this._privacyService.privacy$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((privacy) => {

                // Store the Privacy
                this.privacy = privacy;

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
