// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Third's Modules
import { BehaviorSubject, Observable, tap } from 'rxjs';

// Types
import { Message } from './contact.types';

// Environment
import { environment } from 'src/environments/environment';
const API_URL = process.env['API_URL'] || environment.API_URL;

/**
 * Contact Service
 *
 * @export
 * @class ContactService
 */
@Injectable({
    providedIn: 'root'
})
export class ContactService {

    // Private properties
    private _messageCategories: BehaviorSubject<string[]> = new BehaviorSubject([]);

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
     * Getter for messageCategories
     */
    get messageCategories$(): Observable<string[]> {
        return this._messageCategories.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get message categories
     */
    public getMessageCategories(): Observable<string[]> {
        return this._httpClient.get<string[]>('assets/data/message-categories.json').pipe(
            tap((messageCategories) => {
                this._messageCategories.next(messageCategories);
            })
        );
    }

    /**
     * Send message
     *
     * @param {Message} message
     * @return {Observable<{ok: boolean, message: string}>}
     * @memberof ContactService
     */
    public sendMessage(message: Message): Observable<{ok: boolean, message: string}> {
        return this._httpClient.post<{ok: boolean, message: string}>(`${API_URL}/bot`, { message });
    }
}
