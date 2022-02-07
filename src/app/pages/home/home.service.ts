// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Third's Modules
import { BehaviorSubject, Observable, tap } from 'rxjs';

// Types
import { Member, Product } from './home.types';


/**
 * Home Service
 *
 * @export
 * @class HomeService
 */
@Injectable({
  providedIn: 'root'
})
export class HomeService {


    // Private properties
    private _products: BehaviorSubject<Product[]> = new BehaviorSubject([]);
    private _team: BehaviorSubject<Member[]> = new BehaviorSubject([]);


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
     * Getter for team
     */
    get team$(): Observable<Member[]> {
        return this._team.asObservable();
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
     * Get Team
     */
    public getTeam(): Observable<Member[]> {
        return this._httpClient.get<Member[]>('assets/data/team.json').pipe(
            tap((response) => {
                this._team.next(response);
            })
        );
    }

    /**
     * Get Products
     */
    public getProducts(): Observable<Product[]> {
        return this._httpClient.get<Product[]>('assets/data/products.json').pipe(
            tap((response) => {
                this._products.next(response);
            })
        );
    }
}
