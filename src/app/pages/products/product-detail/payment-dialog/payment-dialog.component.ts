// Angular Modules
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Third's Module
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { Subject, takeUntil } from 'rxjs';
import { athAnimations } from 'src/app/@ath/animations';

// Service
import { ProductsService } from '../../products.service';

// Types
import { Plan } from '../../products.types';


/**
 * Payment Dialog Component
 *
 * @export
 * @class PaymentDialogComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    selector: 'ath-payment-dialog',
    templateUrl: './payment-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: athAnimations
})
export class PaymentDialogComponent implements OnInit, OnDestroy {

    // Public properties
    public iconNames = IconNamesEnum;
    public isLoading: boolean = false;
    public paymentForm: FormGroup;
    public steps: string[] = [];
    public selectedStep: string = 'step1';

    // Private properties
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {productName: string, plan: Plan},
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialogRef: MatDialogRef<PaymentDialogComponent>,
        private _formBuilder: FormBuilder,
        private _productsService: ProductsService,
    ) {
        this.steps = [ 'step1', 'step2', 'step3' ];
        console.log(this.data);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Init payment form
        this.paymentForm = this._formBuilder.group({
            email: [null, [Validators.required, Validators.email]]
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
     * Close the dialog
     */
    public closeDialog(): void {
        this._dialogRef.close();
    }

    public changeStep(step: string) {
        this.selectedStep = step;
    }
}

