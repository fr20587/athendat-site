// Angular MOdules
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

// Third's Modules
import { Observable } from 'rxjs';

// Service
import { ContactService } from './contact.service';


/**
 * Contact Resolver
 *
 * @export
 * @class ContactResolver
 * @implements {Resolve<Contact>}
 */
@Injectable({
    providedIn: 'root'
})
export class ContactResolver implements Resolve<string[]> {

    /**
     * Constructor
     */
    constructor(
        private _contactService: ContactService,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @return {Observable<string[]>}
     * @memberof ContactResolver
     */
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> {
        return this._contactService.getMessageCategories();
    }
}
