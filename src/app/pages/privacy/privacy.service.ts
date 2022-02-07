// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Third's Modules
import { BehaviorSubject, Observable, tap } from 'rxjs';

// Types
import { Privacy } from './privacy.types';


/**
 * Privacy Service
 *
 * @export
 * @class PrivacyService
 */
@Injectable({
    providedIn: 'root'
})
export class PrivacyService {

    // Private properties
    private _privacy: BehaviorSubject<Privacy> = new BehaviorSubject({});


    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for privacy
     */
    get privacy$(): Observable<any> {
        return this._privacy.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get privacy
     */
    public getPrivacy(): Observable<Privacy> {
        return this._httpClient.get<Privacy>('assets/data/privacy.json').pipe(
            tap((response) => {
                this._privacy.next(response);
            })
        );
    }
}
