import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchingService {

  _isLoading = new Subject<boolean>();
  
  get isLoading(): Subject<boolean> {
    return this._isLoading;
  }

  show() {
    this._isLoading.next(true);
  }
  hide() {
    this._isLoading.next(false);
  }
}
