// Angular Modules
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Third's Module
import { Subject, takeUntil } from 'rxjs';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { athAnimations } from 'src/app/@ath/animations';

// Service
import { ProductsService } from '../../products.service';

// Types
import { EnzonaPaymentRequest, Plan, Product, ProductLicense, QvaPayPaymentRequest } from '../../products.types';


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
    public showErrorAlert: boolean = false;
    public errorMessage: string = null;

    // Private properties
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { url: string, product: Product, plan: Plan, completed?: boolean },
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialogRef: MatDialogRef<PaymentDialogComponent>,
        private _formBuilder: FormBuilder,
        private _productsService: ProductsService,
        private _router: Router
    ) {
        this.steps = ['step1', 'step2', 'step3'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Set dialog step
        if (this.data.completed) {
            this.selectedStep = 'step3'
        }

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

    /**
     * Hide the error alert
     */
    public hideErrorAlert(): void {
        this.showErrorAlert = false;
    }

    /**
     * Changes step
     *
     * @param step
     */
    public changeStep(step: string): void {
        this.selectedStep = step;
    }

    /**
     * Get Free License
     */
    public getFreeLicense(): void {

        // Start loading
        this.isLoading = true;

        // Build data object
        const data: ProductLicense = {
            active: true,
            license: null,
            email: this.paymentForm.get('email').value,
            productName: this.data.product.name
        };

        // Send data to service
        this._productsService.getFreeLicense(data)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {

                console.log(response);


                // Stop loading
                this.isLoading = false;

                // Go to complete step
                this.selectedStep = 'step3'

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }, (err: HttpErrorResponse) => {

                console.warn(err);


                // Show error alert
                this.showErrorAlert = true;

                // Stop loading
                this.isLoading = false;

                // Set error message
                this.errorMessage = err.error.message;
            });
    }

    /**
     * Create Enzona Payment Request
     */
    public createEnzonaPaymentRequest(): void {

        // Start loading
        this.isLoading = true;

        // Get client email
        const email = this.paymentForm.get('email').value;

        // Create payment request
        const enzonaPaymentRequest: EnzonaPaymentRequest = {
            description: `Compra de licencia del producto ${this.data.product.name}`,
            currency: 'cup',
            merchant_op_id: '123456789012',
            invoice_number: '200',
            terminal_id: 'ATHENDAT WEB',
            amount: {
                total: '2.00',
                details: {
                    shipping: '0.00',
                    tax: '0.00',
                    discount: '0.00',
                    tip: '0.00'
                }
            },
            items: [
                {
                    name: this.data.product.name,
                    description: 'this.data.product.abstract',
                    quantity: '1',
                    price: '2.00',
                    tax: '0.00'
                }
            ],
            return_url: `https://athendat.site/#${this.data.url}`,
            cancel_url: `https://athendat.site/#${this.data.url}`,
            buyer_identity_code: email
        }
        // total: this.data.plan.cost.toString(),

        this._productsService.createEnzonaPaymentRequest(enzonaPaymentRequest)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {

                // Redirect url
                const redirectUrl = response.result.payment.links[0].href;

                // Open new windows
                window.open(redirectUrl, '_blank');

                // Close dialog
                this.closeDialog()

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }, (err: HttpErrorResponse) => {

                // Stop loading
                this.isLoading = false;

                // Show error alert
                this.showErrorAlert = true;

                // Set error message
                this.errorMessage = err.error.message;
            });
    }

    /**
     * Create QvaPay Payment Request
     */
    public createQvaPayPaymentRequest(): void {

        // Start loading
        this.isLoading = true;

        // Get client email
        const email = this.paymentForm.get('email').value;

        // Create payment request
        const qvaPayPaymentRequest: QvaPayPaymentRequest = {
            amount: this.data.plan.cost / 25,
            description: `Compra de licencia para producto ${this.data.product.name}, se ha aplicado una tasa de cambio de 1:25.`,
            email,
            productName: this.data.product.name,
            license: null,
            createdAt: null
        }

        // Send request
        this._productsService.createQvaPayPaymentRequest(qvaPayPaymentRequest)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {

                // Stop loading
                this.isLoading = false;

                // Redirect url
                const redirectUrl = response.signedUrl;

                // Open new windows
                window.open(redirectUrl, '_blank');

                // Close dialog
                this.closeDialog()

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }, (err: HttpErrorResponse) => {

                console.warn(err);

                // Stop loading
                this.isLoading = false;

                // Show error alert
                this.showErrorAlert = true;

                // Set error message
                this.errorMessage = err.error.messages;
            });

    }
}

