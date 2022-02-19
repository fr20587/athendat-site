// Angular Modules
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

// Third properties
import { Subject, takeUntil } from 'rxjs';
import { IconNamesEnum } from 'ngx-bootstrap-icons';

// Service
import { HomeService } from './home.service';
import { ProductsService } from './../products/products.service';

// Animations
import { athAnimations } from './../../@ath/animations';

// Types
import { Member } from './home.types';
import { Product } from './../products/products.types';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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

    // ViewChild properties
    @ViewChild('subscriberNgForm') subscriberNgForm: NgForm;

    // Public properties
    public alertMessage: string;
    public iconNames = IconNamesEnum;
    public isLoading: boolean = false;
    public products: Product[] = [];
    public showAlert: boolean = false;
    public subscriberForm: FormGroup;
    public team: Member[] = [];

    // Private properties
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _homeService: HomeService,
        private _productsService: ProductsService,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Get Products
        this._productsService.products$
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

        // Init contact form
        this.subscriberForm = this._formBuilder.group({
            active: [true, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
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


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register email
     *
     * @memberof HomeComponent
     */
    public registerEmail(): void {

        // Disable the form
        this.subscriberForm.disable();

        // Change loading status
        this.isLoading = true;

        // Defining data object
        let data = this.subscriberForm.getRawValue();

        console.log(data);

        this._homeService.registerSubscriber(data)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {

                // Store response message
                this.alertMessage = response.message;

                this.showAlert = true;

                // Re-enable the form
                this.subscriberForm.enable();

                // Reset the form
                this.subscriberNgForm.resetForm();

                // Mark for check
                this._changeDetectorRef.markForCheck();

            }, (err: HttpErrorResponse) => {

                console.warn(err);

                // Change loading status
                this.isLoading = false;

                // Show error message
                // this.alertMessage = `${err.error.statusCode}: ${err.message}`;

                // Show error alert
                // this.isErrorAlert = true;

                // Re-enable the form
                this.subscriberForm.enable();

                // Reset the form
                this.subscriberNgForm.resetForm();

            });
    }

}
