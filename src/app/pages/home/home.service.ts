// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Third's Modules
import { BehaviorSubject, Observable, tap } from 'rxjs';

// Types
import { Member } from './home.types';

// Environment
import { environment } from 'src/environments/environment';
// const API_URL = process.env['API_URL'] || environment.API_URL;
const API_URL = environment.API_URL;

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
     * Registers subscriber
     *
     * @param data
     */
    public registerSubscriber(data: { active: boolean; email: string; }): Observable<{ ok: boolean; message: string; }> {
        return this._httpClient.post<{ok: boolean, message: string}>(`${API_URL}/subscribers`, data )
    }

}
