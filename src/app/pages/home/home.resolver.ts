// Angular MOdules
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

// Third's Modules
import { forkJoin, Observable } from 'rxjs';

// Service
import { HomeService } from './home.service';
import { ProductsService } from './../products/products.service';

// Types
import { Member } from './home.types';
import { Product } from './../products/products.types';

/**
 * Home Resolver
 *
 * @export
 * @class HomeResolver
 * @implements {Resolve<[Product[], Member[]]>}
 */
@Injectable({
    providedIn: 'root'
})
export class HomeResolver implements Resolve<[Product[], Member[]]> {

    /**
     * Constructor
     */
    constructor(
        private _homeService: HomeService,
        private _productsService: ProductsService,
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
            this._homeService.getTeam(),
            this._productsService.getProducts(),
        ]);
    }
}
