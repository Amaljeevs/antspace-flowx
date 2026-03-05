import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Strategy } from '../../../core/models/strategy.model';

@Component({
  selector: 'app-strategy-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="card" style="padding: 1rem;">
      <h3 style="margin: 0 0 0.5rem 0;">{{ strategy().name }}</h3>
      @if (strategy().description) {
        <p style="margin: 0 0 0.5rem 0; color: var(--muted-foreground); font-size: 0.875rem;">{{ strategy().description }}</p>
      }
      <span class="badge">{{ strategy().status }}</span>
      <div style="margin-top: 0.75rem;">
        <a [routerLink]="['/app/strategies', strategy().id, 'edit']" class="secondary">Edit</a>
      </div>
    </div>
  `,
})
export class StrategyCardComponent {
  strategy = input.required<Strategy>();
}
