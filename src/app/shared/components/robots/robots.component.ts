import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-robots',
  standalone: true,
  imports: [CommonModule],
  template: `
    <pre>{{ robotsContent }}</pre>
  `,
  styles: [`
    pre {
      white-space: pre-wrap;
      font-family: monospace;
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 0.5rem;
      margin: 1rem;
    }
  `]
})
export class RobotsComponent implements OnInit {
  robotsContent: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.robotsContent = data['content'];
    });
  }
}
