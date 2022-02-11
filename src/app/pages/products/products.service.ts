// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Third's Modules
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

// Types
import { Product } from './products.types';


/**
 * Products Service
 *
 * @export
 * @class ProductsService
 */
@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    // Private properties
    private _product: BehaviorSubject<Product> = new BehaviorSubject(null);
    private _products: BehaviorSubject<Product[]> = new BehaviorSubject([]);

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
     * Getter for product
     */
    get product$(): Observable<Product> {
        return this._product.asObservable();
    }

    /**
     * Getter for products
     */
    get products$(): Observable<Product[]> {
        return this._products.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get Products
     */
    public getProducts(): Observable<Product[]> {
        return this._httpClient.get<Product[]>('assets/data/products.json').pipe(
            tap((products) => {
                this._products.next(products);
            })
        );
    }

    /**
     * Get Product by Id
     *
     * @param id
     */
    public getProductById(id: string): Observable<Product> {
        return this._httpClient.get<Product[]>('assets/data/products.json').pipe(
            map((products) => {
                const product: Product = products.find(products => products._id === id);
                this._product.next(product);
                return product;
            })
        );
    }

}
