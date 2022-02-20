// Angular Modules
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Third properties
import { Subject, takeUntil } from 'rxjs';
import { IconNamesEnum } from 'ngx-bootstrap-icons';

// Service
import { ProductsService } from './../products.service';

// Types
import { Plan, Product } from './../products.types';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ath-product-detail',
    templateUrl: './product-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit, OnDestroy {

    // Public properties
    public iconNames = IconNamesEnum;
    public selectedProduct: Product = null;

    // Private properties
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialog: MatDialog,
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

        // Get transaction uuid and complete payment
        this._activatedRoute.queryParams
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((params) => {

                if (params['completed']) {
                    this.openPaymentDialog(null, true);
                }


                // Mark for check
                this._changeDetectorRef.markForCheck();
            })

        // Get selected product
        this._productsService.product$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((product) => {

                // Store products
                this.selectedProduct = product;

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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open Payment dialog
     *
     * @param {Plan} plan
     * @memberof ProductDetailComponent
     */
    public openPaymentDialog(plan: Plan = null, completed?: boolean) {
        this._dialog.open(PaymentDialogComponent, {
            panelClass: 'ath-dialog-panel',
            data: {
                url: this._router.url,
                product: this.selectedProduct,
                plan,
                completed
            },
        });
    }

}
