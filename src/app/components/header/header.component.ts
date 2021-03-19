import { Component, Input, OnDestroy } from '@angular/core';
import { MediaService } from './../../services/media.service';
import { headerLinksT } from '../../app.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  @Input() headerLinks: headerLinksT[];
  isOpen: boolean = false;
  isRecording: boolean = false;
  subscriptions$: Subscription[] = [];

  constructor(private router: Router, private mediaService: MediaService) {
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

  getSearchValue(e): void {
    this.router.navigate(['search', e.target.value]);
  }
  closeModal(): void {
    this.isOpen = false;
  }

  openModal(): void {
    this.isOpen = true;
  }

  handleClick(): void {
    this.isRecording = !this.isRecording;
    if (this.isRecording) {
      this.mediaService.startRecording();
    } else {
      this.mediaService.stopRecording();
      this.isOpen = false;
    }
  }
}
