// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Third's Modules
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

// Types
import { EnzonaResponse, Product, EnzonaPaymentRequest, ProductLicense, QvaPayPaymentRequest, QvaPayPaymentResponse } from './products.types';

// Environment
import { environment } from 'src/environments/environment';
// const API_URL = process.env['API_URL'] || environment.API_URL;
const API_URL = environment.API_URL;

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

    /**
     * Create ENZONA Payment Request
     *
     * @param {PaymentRequest} paymentRequest
     * @return {Observable<EnzonaResponse>}
     * @memberof ProductsService
     */
    public createEnzonaPaymentRequest(paymentRequest: EnzonaPaymentRequest): Observable<EnzonaResponse> {
        return this._httpClient.post<EnzonaResponse>(`${API_URL}/enzona/payment`, paymentRequest);
    }

    /**
     * Complete Payment
     *
     * @param {string} transaction_uuid
     * @memberof ProductsService
     */
    public completeEnzonaPayment(transaction_uuid: string): Observable<any> {
        return this._httpClient.get(`${API_URL}/enzona/complete-payment/${transaction_uuid}`)
    }

    /**
     * Cancel Payment
     *
     * @param {string} transaction_uuid
     * @memberof ProductsService
     */
    public cancelEnzonaPayment(transaction_uuid: string): Observable<any> {
        return this._httpClient.get(`${API_URL}/enzona/cancel-payment/${transaction_uuid}`);
    }


    /**
     * Create QvaPay Payment Request
     *
     * @param {PaymentRequest} paymentRequest
     * @return {Observable<QvaPayPaymentResponse>}
     * @memberof ProductsService
     */
     public createQvaPayPaymentRequest(paymentRequest: QvaPayPaymentRequest): Observable<QvaPayPaymentResponse> {
        return this._httpClient.post<QvaPayPaymentResponse>(`${API_URL}/qvapay/create/fact-license`, paymentRequest);
    }

    /**
     * Get Free License
     *
     * @param {ProductLicense} data
     * @return {Observable<any>}
     * @memberof ProductsService
     */
    public getFreeLicense(data: ProductLicense): Observable<any> {
        return this._httpClient.post(`${API_URL}/licenses`, data);
    }

}
