import { TestBed, fakeAsync } from '@angular/core/testing';

import { AuthorizedGuard } from './authorized.guard';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthMock } from '../testing/angular-fire-auth.mock';

describe('AuthorizedGuard', () => {
    let guard: AuthorizedGuard;

    let angularFireMock;
    let routerSpy;

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                AuthorizedGuard,
                { provide: AngularFireAuth, useClass: AngularFireAuthMock },
                { provide: Router, useValue: routerSpy }
            ]
        });
        guard = TestBed.inject(AuthorizedGuard);
        angularFireMock = TestBed.inject(AngularFireAuth);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should return true when user is authenticated', (done) => {
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

    it('should redirect to login and return false when user is not authenticated', (done) => {
        spyOnProperty(angularFireMock, 'user', 'get').and.returnValue(of(null));
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
});
