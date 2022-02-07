// Angular MOdules
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

// Third's Modules
import { Observable } from 'rxjs';

// Service
import { PrivacyService } from './privacy.service';

// Types
import { Privacy } from './privacy.types';

/**
 * Privacy Resolver
 *
 * @export
 * @class PrivacyResolver
 * @implements {Resolve<Privacy>}
 */
@Injectable({
    providedIn: 'root'
})
export class PrivacyResolver implements Resolve<Privacy> {

    /**
     * Constructor
     */
    constructor(
        private _privacyService: PrivacyService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolve
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @return {Observable<Privacy>}
     * @memberof PrivacyResolver
     */
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Privacy> {
        return this._privacyService.getPrivacy();
    }
}
