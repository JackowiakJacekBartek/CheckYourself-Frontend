import { Component, Input } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  date: any = new Date();
  minutes: any = 0;
  seconds: any = 0;
  isTimeExceeded: boolean = false;
  @Input() totalTime: string | null | undefined;

  constructor(private timerService: TimerService) {

  }
  
  getElapsedTime() {
    return this.minutes + ":" + this.seconds;
  }

  ngOnInit() {
    this.minutes = "0" + this.minutes;
    this.seconds = "0" + this.seconds;

    const intervalId = setInterval(() => {
      if (!this.isTimeExceeded) {
        if (this.seconds >= 59) {
          ++this.minutes;
          this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
          this.seconds = 0;
        } else {
          ++this.seconds;
        }

        this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
        
        const totalMinutes = parseInt(this.totalTime!.split(':')[0], 10);
        const totalSeconds = parseInt(this.totalTime!.split(':')[1], 10);

        const elapsedTime = `${this.minutes}:${this.seconds}`;
        this.timerService.setElapsedTime(elapsedTime);

        if (this.totalTime && this.minutes >= totalMinutes && this.seconds >= totalSeconds) {
          this.isTimeExceeded = true;
          clearInterval(intervalId);
        }
      }
    }, 1000);
  }
}
