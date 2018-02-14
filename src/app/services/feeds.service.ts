import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {isArray} from 'util';

@Injectable()
export class FeedsService {

    private static readonly ALLOWED_FEED_TYPES = ['publication'];
    public static readonly URL_FEEDS = 'https://api.wizbii.com/v2/dashboard/?direction=newest';

    constructor(public http: HttpClient) {
    }

    /**
     * Get all feeds, filter to get publication only
     * @returns {Observable<any[]>}
     */
    public getAll(): Observable<any[]> {
        const observable = this.http.post(FeedsService.URL_FEEDS, {});
        return observable.map((results: any) => {
            const publications: any [] = [];

            if (results && results.feed_items && isArray(results.feed_items.feed_items)) {
                for (const result of results.feed_items.feed_items) {
                    if (result && FeedsService.ALLOWED_FEED_TYPES.indexOf(result.type) !== -1) {
                        publications.push(result.publication);
                    }
                }
            }

            return publications;
        });
    }
}
