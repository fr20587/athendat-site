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
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialog: MatDialog,
        private _productsService: ProductsService,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
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
    public openPaymentDialog(plan: Plan) {
        this._dialog.open(PaymentDialogComponent, {
            panelClass: 'ath-dialog-panel',
            data: {
                productName: this.selectedProduct.name,
                plan
            },
        });
    }

}
