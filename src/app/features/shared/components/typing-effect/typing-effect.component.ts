import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-typing-effect',
  templateUrl: './typing-effect.component.html',
  styleUrls: ['./typing-effect.component.scss']
})
export class TypingEffectComponent implements OnInit, OnChanges, OnDestroy {
  @Input() text = ''; // Text to be typed, passed from parent component
  @Input() uniqueKey: number | any; // Unique key to identify the component
  @Input() index = 0 // Index of the slide
  @Input() activeIndex: number | any; // Active slide index passed from parent

  displayedText = '';
  private typingSpeed = 100; // Typing speed in milliseconds
  private typingInterval: any;
  private restartTimeout: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startTypingEffectIfActive(); // Start typing effect if active on initialization
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', changes);
    if (changes['activeIndex'] || changes['text']) {
      this.resetTypingEffect();
      if (this.index === this.activeIndex) {
        this.startTypingEffectIfActive();
      }
    }
  }

  ngOnDestroy(): void {
    this.resetTypingEffect(); // Clear interval when component is destroyed
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout); // Clear the restart timeout
    }
  }

  resetTypingEffect(): void {
    this.displayedText = ''; // Reset displayed text
    if (this.typingInterval) {
      clearInterval(this.typingInterval); // Clear any existing interval
      this.typingInterval = null; // Explicitly set to null
    }
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout); // Clear the restart timeout
      this.restartTimeout = null; // Explicitly set to null
    }
  }

  startTypingEffectIfActive(): void {
    if (this.index === this.activeIndex) {
      setTimeout(() => {
        this.startTypingEffect();
      }, 50); // Small delay to ensure change detection completes
    }
  }

  startTypingEffect(): void {
    let i = 0;
    this.typingInterval = setInterval(() => {
      if (i < this.text.length) {
        this.displayedText += this.text.charAt(i);
        this.cdr.detectChanges(); // Manually trigger change detection
        i++;
      } else {
        clearInterval(this.typingInterval); // Stop the typing effect when done

        // Set a timeout to restart the typing effect after 10 seconds
        this.restartTimeout = setTimeout(() => {
          this.resetTypingEffect();
          this.startTypingEffect();
        }, 10000); // 10 seconds delay
      }
    }, this.typingSpeed);
  }
}