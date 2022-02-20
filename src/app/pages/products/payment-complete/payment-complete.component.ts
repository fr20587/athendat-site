// Angular Modules
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

// Third's Module
import { Subject, takeUntil } from 'rxjs';

// Service
import { ProductsService } from './../products.service';

/**
 * Payment Complete Component
 *
 * @export
 * @class PaymentCompleteComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    selector: 'ath-payment-complete',
    templateUrl: './payment-complete.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCompleteComponent implements OnInit, OnDestroy {

    // Public properties
    public productId: string = null;

    // Private properties
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _productsService: ProductsService,
        private _router: Router
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get product id
        this._activatedRoute.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((params) => {

                // Store product id
                this.productId= params['productId'];

                // Mark for check
                this._changeDetectorRef.markForCheck();
            })

        // Get transaction uuid and complete payment
        this._activatedRoute.queryParams
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((params) => {

                this._productsService.completeEnzonaPayment(params['transaction_uuid'])
                    .subscribe(() => {
                        this._router.navigateByUrl(`products/${this.productId}?completed=true`, )
                    })

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
