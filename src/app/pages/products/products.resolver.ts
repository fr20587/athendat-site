// Angular MOdules
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

// Third's Modules
import { Observable, of } from 'rxjs';

// Service
import { ProductsService } from './products.service';

// Types
import { Product } from './products.types';

/**
 * Product Resolver
 *
 * @export
 * @class ProductResolver
 * @implements {Resolve<Product>}
 */
@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {

    /**
     * Constructor
     */
    constructor(
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
     * @return {Observable<[Product>}
     * @memberof ProductResolver
     */
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        return this._productsService.getProductById(route.params['productId']);
    }
}
