import {Injectable} from '@angular/core';

@Injectable()
/**
 * Reflect application current state, store shared data in the whole application
 */
export class AppStateService {

    public static readonly LS_TOKEN = 'wizbii_token';
    private token: string = null;

    constructor() {
    }

    /**
     * Get token stored in localstorage or already in memory
     * @returns {string}
     */
    public getToken(): string {
        return this.token ? this.token : this.token = localStorage.getItem(AppStateService.LS_TOKEN);
    }

    /**
     * Set token in localstorage for future use and in memory
     * @param {string} value
     */
    public setToken(value: string): void {
        localStorage.setItem(AppStateService.LS_TOKEN, value);
        this.token = value;
    }

}
