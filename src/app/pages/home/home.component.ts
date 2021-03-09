import { MediaService } from './../../services/media.service';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  isRecording: boolean = false;

  subscriptions$: Subscription[] = [];

  constructor(private mediaService: MediaService, private router: Router) {
    const sub = this.mediaService.sound$.subscribe((stream) => {
      this.mediaService.recognize(stream).subscribe((response) => {
        this.router.navigate([
          'search',
          response.results[0]?.alternatives[0]?.transcript || 'chicken',
        ]);
      });
    });
    this.subscriptions$.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((sub) => sub.unsubscribe());
  }

  handleClick(): void {
    this.isRecording = !this.isRecording;
    if (this.isRecording) {
      this.mediaService.startRecording();
    } else {
      this.mediaService.stopRecording();
    }
  }
}
