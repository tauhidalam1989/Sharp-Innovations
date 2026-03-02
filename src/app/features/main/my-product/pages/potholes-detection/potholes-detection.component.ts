import { Component } from '@angular/core';

@Component({
  selector: 'app-potholes-detection',
  templateUrl: './potholes-detection.component.html',
  styleUrls: ['./potholes-detection.component.scss']
})
export class PotholesDetectionComponent {
  activeFaq: number | null = null;

  toggleFaq(index: number): void {
    this.activeFaq = this.activeFaq === index ? null : index;
  }
}
