import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private elapsedTimeSubject = new Subject<string>();

  getElapsedTime() {
    return this.elapsedTimeSubject.asObservable();
  }

  setElapsedTime(elapsedTime: string) {
    this.elapsedTimeSubject.next(elapsedTime);
  }
}
