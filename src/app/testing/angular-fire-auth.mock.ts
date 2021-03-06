import { of } from 'rxjs';

export class AngularFireAuthMock {
    get user() {
        return of({ username: 'test' })
    }
    signOut() {
        return of(null).toPromise();
    }
}