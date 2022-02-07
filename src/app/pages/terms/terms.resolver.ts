// Angular MOdules
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

// Third's Modules
import { Observable } from 'rxjs';

// Service
import { TermsService } from './terms.service';

// Types
import { Terms } from './terms.types';

/**
 * Terms Resolve
 *
 * @export
 * @class TermsResolver
 * @implements {Resolve<Terms>}
 */
@Injectable({
    providedIn: 'root'
})
export class TermsResolver implements Resolve<Terms> {

    /**
     * Constructor
     */
    constructor(
        private _termsService: TermsService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolve
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @return {Observable<Terms>}
     * @memberof TermsResolver
     */
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Terms> {
        return this._termsService.getTerms();
    }
}
