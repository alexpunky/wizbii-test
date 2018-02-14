import {TestBed, inject} from '@angular/core/testing';

import {FeedsService} from './feeds.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('FeedsService', () => {
    let service: FeedsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FeedsService],
            imports: [HttpClientTestingModule]
        });

        service = TestBed.get(FeedsService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', inject([FeedsService], (service: FeedsService) => {
        expect(service).toBeTruthy();
    }));

    it('should be empty, null json', () => {
        service.getAll().subscribe(next => {
            expect(next).toBeDefined();
            expect(next.length).toBe(0);
        });

        const getAllRequest = httpMock.expectOne(FeedsService.URL_FEEDS);
        getAllRequest.flush(null);
    });

    it('should be empty, no feed items', () => {
        service.getAll().subscribe(next => {
            expect(next).toBeDefined();
            expect(next.length).toBe(0);
        });

        const getAllRequest = httpMock.expectOne(FeedsService.URL_FEEDS);
        getAllRequest.flush([
            {title: 'test'}
        ]);
    });

    it('should be empty, bad json', () => {
        service.getAll().subscribe(next => {
            expect(next).toBeDefined();
            expect(next.length).toBe(0);
        });

        const getAllRequest = httpMock.expectOne(FeedsService.URL_FEEDS);
        getAllRequest.flush(
            {
                feed_items: [
                    {type: 'publication'}
                ]
            }
        );
    });

    it('should have one item', () => {
        service.getAll().subscribe(next => {
            expect(next).toBeDefined();
            expect(next.length).toBe(1);
        });

        const getAllRequest = httpMock.expectOne(FeedsService.URL_FEEDS);
        getAllRequest.flush({
                feed_items: {
                    feed_items: [
                        {
                            type: 'publication',
                            publication: {
                                title: 'test'
                            }
                        }
                    ]
                }
            }
        );
    });

    it('should have one item of two', () => {
        service.getAll().subscribe(next => {
            expect(next).toBeDefined();
            expect(next.length).toBe(1);
        });

        const getAllRequest = httpMock.expectOne(FeedsService.URL_FEEDS);
        getAllRequest.flush({
                feed_items: {
                    feed_items: [
                        {
                            type: 'publication',
                            publication: {
                                title: 'test'
                            }
                        },
                        {
                            type: 'invalid',
                            publication: {
                                title: 'test'
                            }
                        }
                    ]
                }
            }
        );
    });

    it('should have two items', () => {
        service.getAll().subscribe(next => {
            expect(next).toBeDefined();
            expect(next.length).toBe(2);
        });

        const getAllRequest = httpMock.expectOne(FeedsService.URL_FEEDS);
        getAllRequest.flush({
                feed_items: {
                    feed_items: [
                        {
                            type: 'publication',
                            publication: {
                                title: 'test'
                            }
                        },
                        {
                            type: 'publication',
                            publication: {
                                title: 'test'
                            }
                        }
                    ]
                }
            }
        );
    });


});
