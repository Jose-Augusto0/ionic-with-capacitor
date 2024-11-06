import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  videoElement: HTMLVideoElement | undefined;
  canvasElement: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | null = null;
  imageUrl: string | undefined;

  ngOnInit() {
    this.videoElement = document.getElementById('video') as HTMLVideoElement;
    this.canvasElement = document.createElement('canvas');
    this.context = this.canvasElement.getContext('2d');
  }

  startCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (this.videoElement) {
          this.videoElement.srcObject = stream;
          this.videoElement.play();
        }
      })
      .catch((err) => {
        console.error('Erro ao acessar a webcam: ', err);
      });
  }

  takePicture() {
    if (this.context && this.canvasElement && this.videoElement) {
      this.canvasElement.width = this.videoElement.videoWidth;
      this.canvasElement.height = this.videoElement.videoHeight;

      this.context.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      this.imageUrl = this.canvasElement.toDataURL('image/png');
      console.log(this.imageUrl);
    }
  }
}
