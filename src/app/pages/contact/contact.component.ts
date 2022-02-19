import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { OnDestroy, ViewChild } from '@angular/core';
// Angular Modules
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';

// Third's Modules
import { finalize, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';

// Services
import { ContactService } from './contact.service';
import { Alert, Message } from './contact.types';
import { omit } from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Contact Component
 *
 * @export
 * @class ContactComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    selector: 'ath-contact',
    templateUrl: './contact.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit, OnDestroy {

    // ViewChild properties
    @ViewChild('contactNgForm') contactNgForm: NgForm;

    // Public properties
    public alert: Alert;
    public alertMessage: string;
    public contactForm: FormGroup;
    public countdown: number = 5;
    public isConfirmationAlert: boolean = false;
    public isErrorAlert: boolean = false;
    public isLoading: boolean = false;
    public messageCategories: string[] = [];

    // Private properties
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _contactService: ContactService,
        private _formBuilder: FormBuilder
    ) { }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Get selected messageCategories
        this._contactService.messageCategories$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((messageCategories) => {

                // Store products
                this.messageCategories = messageCategories;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            })

        // Init contact form
        this.contactForm = this._formBuilder.group({
            _id: [null],
            fullName: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            category: [null, [Validators.required]],
            subject: [null, [Validators.required]],
            message: [null, [Validators.required]],
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
     * Send message
     *
     * @memberof ContactComponent
     */
    public sendMessage(): void {

        // Disable the form
        this.contactForm.disable();

        // Change loading status
        this.isLoading = true;

        // Defining message object
        let message: Message = this.contactForm.getRawValue();

        this._contactService.sendMessage(message)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {

                // Change loading status
                this.isLoading = false;
                
                // Store response message
                this.alertMessage = response.message;

                // Check response to show alert
                switch (response.ok) {
                    // Show confirmation alert
                    case response.ok:
                        this.isConfirmationAlert = true;
                        break;

                    // Show error alert
                    case !response.ok:
                        this.isErrorAlert = true;
                        break;

                    default:
                        break;
                }

                // Re-enable the form
                this.contactForm.enable();

                // Reset the form
                this.contactNgForm.resetForm();

                // Mark for check
                this._changeDetectorRef.markForCheck();

            }, (err: HttpErrorResponse) => {

                console.warn(err);

                // Change loading status
                this.isLoading = false;

                // Show error message
                this.alertMessage = `${err.error.statusCode}: ${err.message}`;

                // Show error alert
                this.isErrorAlert = true;

                // Re-enable the form
                this.contactForm.enable();

                // Reset the form
                this.contactNgForm.resetForm();

            });

    }

    /**
     * Close alert
     *
     * @param {string} alert
     * @memberof ContactComponent
     */
    public closeAlert(alert: Alert): void {
        // Check response to show alert
        switch (alert) {
            // Show confirmation alert
            case (alert = 'confirmation'):
                this.isConfirmationAlert = false;
                break;

            // Show error alert
            case (alert = 'error'):
                this.isErrorAlert = false;
                break;

            default:
                break;
        }
    }
}
