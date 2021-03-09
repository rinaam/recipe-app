import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

declare var MediaRecorder: any;

export type recognizeResponseT = {
  result_index: number;
  results: {
    final: boolean;
    alternatives: {
      transcript: string;
      confidence: number;
    }[];
  }[];
};

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  streamReference;
  mediaRecorder: any;
  audioChunks: any[] = [];

  sound$: Subject<Blob> = new Subject<Blob>();

  constructor(private http: HttpClient) {}

  setupMediaRecorder(): Promise<void> {
    return new Promise((resolve) => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.streamReference = stream;
        this.mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm',
        });

        const dataAvailableListener = (event) => {
          this.audioChunks.push(event.data);
        };

        this.mediaRecorder.removeEventListener(
          'dataavailable',
          dataAvailableListener,
          true
        );

        this.mediaRecorder.addEventListener(
          'dataavailable',
          dataAvailableListener
        );

        resolve();
      });
    });
  }

  startRecording(): void {
    this.stopStream();

    this.setupMediaRecorder().then(() => {
      this.mediaRecorder.start();
    });
  }

  stopRecording(): void {
    const stopListener = () => {
      const audioBlob = new Blob(this.audioChunks);
      this.sound$.next(audioBlob);
    };
    this.mediaRecorder.removeEventListener('stop', stopListener, true);
    this.mediaRecorder.addEventListener('stop', stopListener);
    this.mediaRecorder.stop();

    this.stopStream();
  }

  stopStream() {
    this.audioChunks = [];
    if (!this.streamReference) return;

    this.streamReference.getAudioTracks().forEach((track) => {
      track.stop();
    });

    this.streamReference = null;
  }

  recognize(stream: Blob): Observable<recognizeResponseT> {
    return this.http.post<recognizeResponseT>(
      'https://api.eu-de.speech-to-text.watson.cloud.ibm.com/instances/311a6125-93b7-40cb-865f-06e774d72dcd/v1/recognize?max_alternatives=3',
      stream,
      {
        headers: {
          'Content-Type': 'audio/webm',
          Authorization:
            'Basic YXBpa2V5OmdqTmdTRWdwOVE1V1pXQUhBdXJXYWRaeE5kS1dqcDFUdzRJMTRHT2xWcXpx',
        },
      }
    );
  }
}
