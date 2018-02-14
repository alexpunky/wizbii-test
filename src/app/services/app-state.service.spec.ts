import {TestBed, inject} from '@angular/core/testing';

import {AppStateService} from './app-state.service';

describe('AppStateService', () => {
    let service: AppStateService;

    beforeEach(() => {
        service = new AppStateService();
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('token not be set', () => {
        expect(service.getToken()).toBeFalsy();
    });

    it('token should be set', () => {
        expect(service).toBeTruthy();
        const token = 'my-test-token';
        const otherToken = 'my-new-token';
        service.setToken(token);
        expect(service.getToken() === token).toBeTruthy();
        service.setToken(otherToken);
        expect(service.getToken() === otherToken).toBeTruthy();
    });

    it('token should be set in localstorage', () => {
        expect(service).toBeTruthy();
        const token = 'my-test-token';
        service.setToken(token);
        expect(localStorage.getItem(AppStateService.LS_TOKEN) === token).toBeTruthy();
    });
});
