import { TestBed } from '@angular/core/testing';

import { FetchingService } from './fetching.service';

describe('FetchingService', () => {
    let service: FetchingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FetchingService
            ]
        });
        service = TestBed.inject(FetchingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('isLoading should be truthy', () => {
        expect(service.isLoading).toBeTruthy();
    });

    it('show should be truthy', () => {
        expect(service.show).toBeTruthy()
    });

    it('hide should be truthy', () => {
        expect(service.hide).toBeTruthy();
    });

    it('show should reurn undefined', () => {
        expect(service.show()).toBeUndefined();
    });

    it('hide should return undefined', () => {
        expect(service.hide()).toBeUndefined();
    });

    it('show call should emit true on isLoading observable', done => {
        service.isLoading.subscribe(v => {
            expect(v).toBeTrue();
            done();
        });
        service.show();
    });

    it('hide call should emit false on isLoading observable', done => {
        service.isLoading.subscribe(v => {
            expect(v).toBeFalse();
            done();
        });
        service.hide();
    });

});
