import { TestBed } from '@angular/core/testing';

import { UnauthorizedGuard } from './unauthorized.guard';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthMock } from '../testing/angular-fire-auth.mock';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('UnauthorizedGuard', () => {
    let guard: UnauthorizedGuard;

    let angularFireMock;
    let routerSpy;

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                UnauthorizedGuard,
                { provide: AngularFireAuth, useClass: AngularFireAuthMock },
                { provide: Router, useValue: routerSpy }
            ]
        });
        guard = TestBed.inject(UnauthorizedGuard);
        angularFireMock = TestBed.inject(AngularFireAuth);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should redirect to authenticated and return false when user is authenticated', (done) => {
        guard.canActivate(null, null).subscribe(
            res => {
                expect(routerSpy.navigate).toHaveBeenCalled();
                expect(res).toBeFalse();
                done();
            },
            () => {
                done.fail('should not be rejected');
            }
        );
    });

    it('should return false when user is not authenticated', (done) => {
        spyOnProperty(angularFireMock, 'user', 'get').and.returnValue(of(null));
        guard.canActivate(null, null).subscribe(
            res => {
                expect(routerSpy.navigate).not.toHaveBeenCalled();
                expect(res).toBeTrue();
                done();
            },
            () => {
                done.fail('should not be rejected');
            }
        );
    });

});
