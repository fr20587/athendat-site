// Angular MOdules
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

// Third's Modules
import { forkJoin, Observable } from 'rxjs';

// Service
import { HomeService } from './home.service';

// Types
import { Member, Product } from './home.types';

/**
 * Home Resolver
 *
 * @export
 * @class HomeResolver
 * @implements {Resolve<Home>}
 */
@Injectable({
    providedIn: 'root'
})
export class HomeResolver implements Resolve<[Product[], Member[]]> {

    /**
     * Constructor
     */
    constructor(
        private _homeService: HomeService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @return {Observable<[Product[], Member[]]>}
     * @memberof HomeResolver
     */
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Product[], Member[]]> {
        return forkJoin([
            this._homeService.getProducts(),
            this._homeService.getTeam(),
        ]);
    }
}
