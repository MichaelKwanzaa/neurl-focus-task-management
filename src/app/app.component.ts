import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/authentication-service/authentication.service';
import { TimerService } from './core/services/timer-service/timer.service';
import { UrlRestrictionService } from './core/services/url-restriction-service/url-restriction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  isTimerActive: boolean = false;


  constructor( 
    private urlRestrictionService: UrlRestrictionService,
    private timerService: TimerService){
      window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));

      // Subscribe to the timerActive Observable to get the latest timer state
      this.timerService.timerActive.subscribe(active => {
        this.isTimerActive = active;
        console.log({active})
      });
  }

  private handleBeforeUnload(event: BeforeUnloadEvent) {
    const url = event.target?.toString() || '';
    const isRestricted = this.urlRestrictionService.isUrlRestricted(url);

    console.log(this.isTimerActive, "active status");
    console.log({url})
    if (this.isTimerActive && isRestricted) {
      event.preventDefault();
      event.returnValue = '';
    }
  }

 
}
