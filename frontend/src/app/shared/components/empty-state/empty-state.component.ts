import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div style="text-align: center; padding: 2rem; color: var(--muted-foreground);">
      <p style="font-size: 1.25rem; margin-bottom: 0.5rem;">{{ message() }}</p>
      @if (actionLabel()) {
        <ng-content select="[action]"></ng-content>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  message = input<string>('No data yet');
  actionLabel = input<string | undefined>(undefined);
}
