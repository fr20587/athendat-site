// Angular Modules
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

// Third properties
import { Subject, takeUntil } from 'rxjs';
import { IconNamesEnum } from 'ngx-bootstrap-icons';

// Service
import { ProductsService } from './../products.service';

// Types
import { Product } from './../products.types';

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

}
