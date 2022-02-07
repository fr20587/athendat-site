// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Third's Modules
import { BehaviorSubject, Observable, tap } from 'rxjs';

// Types
import { Terms } from './terms.types';


/**
 * Terms Service
 *
 * @export
 * @class TermsService
 */
@Injectable({
    providedIn: 'root'
})
export class TermsService {

    // Private properties
    private _terms: BehaviorSubject<Terms> = new BehaviorSubject({});


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
     * Getter for terms
     */
     get terms$(): Observable<any> {
        return this._terms.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get terms
     */
    public getTerms(): Observable<Terms> {
        return this._httpClient.get<Terms>('assets/data/terms.json').pipe(
            tap((response) => {
                this._terms.next(response);
            })
        );
    }
}
